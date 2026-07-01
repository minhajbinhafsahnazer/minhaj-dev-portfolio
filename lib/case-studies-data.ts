// lib/case-studies-data.ts

export interface CaseStudyChallenge {
  question: string;
  answer: string;
}

export interface CaseStudyDecision {
  title: string;
  rationale: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  problem: {
    title: string;
    text: string;
    details: string[];
  };
  challenges: {
    title: string;
    items: CaseStudyChallenge[];
  };
  solution: {
    title: string;
    text: string;
    decisions: CaseStudyDecision[];
    codeExample?: {
      language: string;
      code: string;
      filename: string;
    };
  };
  lessons: string;
  techStack: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "control-center-platform": {
    slug: "control-center-platform",
    title: "Control Center Platform",
    subtitle: "Building an enterprise administration console for managing organizations, permissions, users, and operational workflows.",
    category: "Full Stack Development",
    problem: {
      title: "The Problem",
      text: "As our B2B SaaS platform scaled, administrators lacked a centralized console to handle organization structures, onboard new corporate tenants, customize user seats, audit calculations, and manage security parameters. Simple configuration changes required manual database scripts, increasing the risk of data drift, tenant configuration gaps, and operational overhead.",
      details: [
        "No visual workspace to configure tenant parameters, invite administrators, or configure operational variables.",
        "Manual SQL scripts needed to provision database structures or manage organizational hierarchies.",
        "High risk of configuration cross-contamination when managing multi-tenant settings.",
        "Lack of visibility into system changes and configuration edits."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we implement Role-Based Access Control (RBAC)?",
          answer: "In a multi-tenant incentive engine, basic user-admin permissions are insufficient. Enterprise tenants require granular permission matrices where some users can view commission logs but not modify commission plans, while primary administrators can invite and configure all profiles. We designed a dynamic, bitwise-mask RBAC system to allow tenant admins to create custom permission profiles dynamically."
        },
        {
          question: "Why did we choose stateless JWT token authentication with database verification?",
          answer: "Storing user roles directly inside a JWT payload creates security risks (if a user's permissions are revoked mid-session, they can still execute requests until the token expires). To maintain a zero-trust model, the JWT payload contains only the user ID and expiration, while roles, active tenant associations, and resource bounds are queried fresh from database context on every request."
        },
        {
          question: "Why did we use background worker queues for tenant onboarding?",
          answer: "Provisioning a new B2B tenant requires setting up schemas, default templates, system variables, and inviting administrative users. Running this sequence synchronously within an HTTP request block resulted in high API latencies (>5 seconds). By offloading schema generation and template setup to background processes, we kept client onboarding response latency under 100ms."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We engineered a clean dashboard platform separating the control console from the core data processing microservice. The solution introduces a zero-trust gateway pattern ensuring that every request validates user identity, checks active tenant alignment, queries fresh permissions, and logs the operation in the system audit trail.",
      decisions: [
        {
          title: "Database-Driven Policy Scoping",
          rationale: "Instead of hardcoding role-based endpoints, we developed custom DB scoping logic (using SQLAlchemy event hooks) that automatically intercepts queries and scopes results based on the active user's tenant ID, enforcing row-level isolation."
        },
        {
          title: "Asynchronous Workspace Provisioning",
          rationale: "Used background tasks to provision database tables and populate defaults, so the user receives a success confirmation immediately and can begin configuring their team within seconds."
        }
      ],
      codeExample: {
        language: "typescript",
        code: `// Example middleware for user context and tenant verification
import { Request, Response, NextFunction } from 'express';
import { db } from '@/lib/db';
import { ForbiddenError } from '@/lib/errors';

export async function verifyTenantAccess(req: Request, res: Response, next: NextFunction) {
  const userId = req.user?.id;
  const tenantId = req.headers['x-tenant-id'] as string;

  if (!userId || !tenantId) {
    return next(new ForbiddenError('Missing user identity or organization context.'));
  }

  // Fetch role and tenant membership context fresh from the database
  const membership = await db.tenantMembership.findFirst({
    where: { userId, tenantId, isActive: true },
    include: { role: { include: { permissions: true } } }
  });

  if (!membership) {
    return next(new ForbiddenError('Unauthorized: User is not an active member of this organization.'));
  }

  // Inject current scope into request context
  req.tenantContext = {
    id: tenantId,
    role: membership.role.name,
    permissions: membership.role.permissions.map(p => p.key)
  };

  next();
}`,
        filename: "middleware/tenantContext.ts"
      }
    },
    lessons: "If I rebuilt this today, I would separate the authorization service from the core application layer completely, using event-driven communication (like Kafka messages) to sync permission changes and cache verified scopes in a distributed Redis database to decrease database query load.",
    techStack: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "AWS", "TypeScript"]
  },

  "designing-scalable-apis": {
    slug: "designing-scalable-apis",
    title: "Designing Scalable REST APIs",
    subtitle: "Building high-performance asynchronous API endpoints to process thousands of transaction rows in sub-second times.",
    category: "Backend Systems",
    problem: {
      title: "The Problem",
      text: "Enterprise clients upload large batches of sales records (ranging from 10k to 100k+ rows per file) to calculate incentives and commission logs. Synchronous endpoints struggled to parse, validate, and write these large payloads in time, hitting gateway timeouts, locking database transactions, and occasionally creating corrupted database states.",
      details: [
        "API timeouts caused by long-running synchronous database transaction loops.",
        "Database connection pooling exhaustion during bulk calculation requests.",
        "Duplicate upload submissions triggering double commission records.",
        "Lack of transaction rollback on structural validation failures."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we use async-first FastAPI over Django or Flask?",
          answer: "FastAPI is built natively on ASGI (Asynchronous Server Gateway Interface), which allows it to handle hundreds of parallel network and database I/O tasks concurrently without blocking the server process. This makes it significantly more efficient at handling long-running bulk inputs than traditional sync WSGI frameworks."
        },
        {
          question: "Why did we implement manual, explicit database transactions?",
          answer: "Auto-commit loops commit records to the database one line at a time. If an import fails halfway through validation, the database is left in a dirty, partially imported state. We implemented explicit database transactions that wrap the entire import sequence, executing rollbacks on any validation failure."
        },
        {
          question: "Why did we implement Redis caching for validation lookups?",
          answer: "Querying the database to check if a specific employee or product exists for every single row in a 10,000-line CSV file creates connection bottlenecks. By pulling static employee directories and products into Redis, we reduced query latency by 94%."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We built an asynchronous transaction streaming pipeline. The API immediately accepts the raw payload, verifies the dataset's checksum against a Redis cache to prevent duplicate imports, and queues the verification tasks in background worker pools. Clients pull pipeline status endpoints or receive webhooks when calculations are complete.",
      decisions: [
        {
          title: "Bulk Copy Writes",
          rationale: "Instead of executing separate `INSERT` commands, we leveraged PostgreSQL's copy protocol, batching 10,000 inserts into a single bulk database command."
        },
        {
          title: "Bloom Filters for Duplicates",
          rationale: "Used Redis bloom filters to index incoming dataset content hashes, allowing the system to detect and reject identical upload submissions in less than 5ms."
        }
      ],
      codeExample: {
        language: "python",
        code: `# Asynchronous FastAPI transaction commit pipeline
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.services import transaction_service

router = APIRouter()

@router.post("/import", status_code=status.HTTP_202_ACCEPTED)
async def import_transactions(
    payload: TransactionImportSchema,
    db: AsyncSession = Depends(get_db)
):
    # Check for content duplicates in Redis before database execution
    is_duplicate = await transaction_service.verify_unique_hash(payload.content_hash)
    if is_duplicate:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate transaction set detected. This import has already been processed."
        )
        
    # Queue task for background async parsing & validation
    task_id = await transaction_service.enqueue_import_job(payload, db)
    return {"status": "queued", "task_id": task_id}
`,
        filename: "routers/transactions.py"
      }
    },
    lessons: "If I rebuilt this today, I would skip passing the payload directly through the API server. I would generate signed S3 URLs, let the frontend upload the file directly, and have S3 emit bucket events to trigger serverless processing workers.",
    techStack: ["FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "Celery", "Python"]
  },

  "aws-deployment": {
    slug: "aws-deployment",
    title: "AWS Deployment & DevOps Journey",
    subtitle: "Deploying containerized multi-tenant services with automated rollouts, edge security, and cloud scalability.",
    category: "DevOps & Cloud",
    problem: {
      title: "The Problem",
      text: "Manual application deployments onto virtual instances created configuration drift, environment mismatches, and deployment downtime. When commission calculations peaked at end-of-month, server instances suffered memory limits and slowed down without automated resource scaling.",
      details: [
        "Manual server upgrades causing service interruptions.",
        "Lack of automated auto-scaling during computational traffic peaks.",
        "Exposing credentials directly in codebases or configuration files.",
        "Inconsistent node configurations across staging and production instances."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we choose ECS Fargate over EKS (Kubernetes)?",
          answer: "ECS Fargate is a serverless container orchestration platform that removes the overhead of managing node servers. For a small engineering team, EKS adds unnecessary complexity. Fargate scales easily and charges only for resource time used."
        },
        {
          question: "Why did we integrate AWS Secrets Manager at runtime?",
          answer: "Exposing API credentials or database keys in static environment files is a critical vulnerability. We integrated the AWS SDK to fetch parameters directly from Secrets Manager into container memory during boot, preventing leak risks."
        },
        {
          question: "Why did we use Cloudflare CDN edge caching?",
          answer: "Static resources and API page requests loaded slowly from single-region host nodes. Routing traffic through Cloudflare caches assets at local edges, decreasing global page load times."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We implemented an automated serverless deployment architecture. The application is containerized with Docker, automatically compiled and built via GitHub Actions pipelines, pushed to Amazon Elastic Container Registry (ECR), and deployed onto ECS Fargate tasks sitting behind an Application Load Balancer.",
      decisions: [
        {
          title: "GitHub Actions Auto-Rollout",
          rationale: "Created pipelines that compile, test, build, and trigger zero-downtime rolling updates in ECS on every production push."
        },
        {
          title: "VPC Networking Partitioning",
          rationale: "Isolated databases in private subnets, restricting network ingress permissions strictly to API containers in public subnets via security groups."
        }
      ],
      codeExample: {
        language: "yaml",
        code: `# GitHub Actions CI/CD Deployment Flow
name: Production Deployment

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Run Tests & Linters
      run: |
        npm ci
        npm run lint
        npm run test

    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy to ECS Fargate
      uses: aws-actions/aws-ecs-deploy-task-definition@v2
      with:
        task-definition: task-def.json
        service: apistride-production-service
        cluster: apistride-cluster
        wait-for-service-stability: true`,
        filename: ".github/workflows/deploy.yml"
      }
    },
    lessons: "If I rebuilt this today, I would define the entire infrastructure as code using Terraform from the very first deploy to ensure consistent, reproducible environments and track configuration changes inside git repositories.",
    techStack: ["AWS ECS", "Fargate", "Docker", "GitHub Actions", "Cloudflare", "PostgreSQL", "Terraform"]
  },

  "agentic-ai": {
    slug: "agentic-ai",
    title: "Context-Aware Agentic Conversational AI",
    subtitle: "Integrating AI agents to autonomously analyze company compliance, query tenant parameters, and trigger actions.",
    category: "Artificial Intelligence",
    problem: {
      title: "The Problem",
      text: "Sales executives and commission analysts spent hours browsing documentation pages and raw databases to resolve commission questions and understand incentive plans. We needed an interactive AI assistant that could interpret company rules, answer questions in plain language, query database stats securely, and trigger workflows.",
      details: [
        "Analysts wasting time looking up parameters and sales calculations.",
        "Inability of traditional search systems to understand context-specific incentive plans.",
        "Security risks of AI models accessing files or databases belonging to neighboring tenants.",
        "LLM hallucinations creating false answers about calculation details."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we use pgvector for semantic search?",
          answer: "Standard SQL matching cannot resolve complex natural language context. By translating incentive documents into vector embeddings and storing them in pgvector, we enabled semantic search to pull context based on meaning rather than keywords."
        },
        {
          question: "Why did we enforce structured Pydantic outputs?",
          answer: "AI models return unstructured text responses by default, which can break client interfaces. We defined strict Pydantic return schemas and configured OpenAI's structured outputs to guarantee API consistency."
        },
        {
          question: "Why did we implement session-based query scoping?",
          answer: "Giving LLMs raw tool access to database endpoints is highly dangerous in SaaS. We injected organization constraints directly into each query tool, preventing the agent from searching neighboring tenant partitions."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We built an agentic conversational AI workflow. The system intercepts user messages, searches contextual vectors inside pgvector database, maps commands to structured endpoint calls using OpenAI tool selection, and outputs contextual responses and actions.",
      decisions: [
        {
          title: "Dynamic Token Scoping",
          rationale: "Ensures the LLM prompt context contains only reference documents and data rows matching the verified caller's organization ID."
        },
        {
          title: "API-Only Tool execution",
          rationale: "The AI agent interacts only via predefined API schemas rather than running database scripts directly, keeping data manipulation secure."
        }
      ],
      codeExample: {
        language: "python",
        code: `# Agent query tool scoping in FastAPI
from typing import List
from pydantic import BaseModel, Field
from app.services import transaction_service

class TransactionSearchTool(BaseModel):
    employee_id: str = Field(description="The unique identifier of the employee.")
    period: str = Field(description="The fiscal period to check (e.g. '2026-Q1').")

async def execute_scoped_search(tool_args: TransactionSearchTool, org_id: str, db):
    # Enforce strict organization boundary on tool execution
    transactions = await transaction_service.get_transactions_by_scope(
        org_id=org_id,
        employee_id=tool_args.employee_id,
        period=tool_args.period,
        db=db
    )
    return transactions
`,
        filename: "tools/search_tool.py"
      }
    },
    lessons: "If I rebuilt this today, I would build an agent state graph using LangGraph, establishing a human-in-the-loop validation step before executing state-changing transactions.",
    techStack: ["FastAPI", "pgvector", "OpenAI API", "Next.js", "TypeScript", "LangChain"]
  },

  "ai-integration": {
    slug: "ai-integration",
    title: "Integrating AI into Business Applications",
    subtitle: "Engineering resilient, production-ready AI pipelines with structured JSON outputs and cost optimization.",
    category: "Artificial Intelligence",
    problem: {
      title: "The Problem",
      text: "Integrating AI APIs into production systems often exposes weaknesses in latency, token costs, rate-limiting failures, and unstructured output errors. Standard LLM calls fail unpredictably under load, leading to dashboard crashes and high operational expenses.",
      details: [
        "LLM formatting errors causing JSON parsing crashes in dashboards.",
        "High token costs from repeating context in prompts.",
        "API rate-limits causing transaction validation to fail.",
        "Lack of visibility into latency and execution pricing."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we implement structured JSON output schemas?",
          answer: "To safely render data dynamically inside a user dashboard, outputs must match exact types. We utilized OpenAI's json_schema mode to force the model to comply with our exact JSON schemas, reducing parsing exceptions to zero."
        },
        {
          question: "Why did we implement exponential backoff retry patterns?",
          answer: "Under production loads, LLM providers hit temporary rate-limits. Instead of failing requests, we wrapped call functions with backoff mechanisms that retry the call with increasing delays, preventing service crashes."
        },
        {
          question: "Why did we build a semantic caching layer in Redis?",
          answer: "Repeating LLM queries for similar data is slow and expensive. We built a semantic cache inside Redis that stores queries and returns cached responses for identical inquiries, reducing API execution fees."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We engineered a resilient AI middleware wrapper. It formats instructions, validates the structural schemas of LLM returns against Pydantic models, handles fallbacks, caches answers, and monitors processing metrics.",
      decisions: [
        {
          title: "Semantic Cache Lookup",
          rationale: "Checks incoming queries against Redis vector store, serving identical semantic matches instantly without calling the LLM API."
        },
        {
          title: "Multi-Model Failover Routing",
          rationale: "Routes simple queries to smaller models and routes to premium models only if structural validation fails, optimizing execution costs."
        }
      ],
      codeExample: {
        language: "typescript",
        code: `// Resilient OpenAI structured calling interface
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI();

export const AnalysisSchema = z.object({
  score: z.number(),
  summary: z.string(),
  recommendations: z.array(z.string())
});

export async function executeResilientCall(prompt: string, retries = 3) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [{ role: "user", content: prompt }],
        response_format: zodResponseFormat(AnalysisSchema, "analysis"),
      });
      
      return response.choices[0].message.parsed;
    } catch (error) {
      attempt++;
      if (attempt >= retries) throw error;
      // Exponential backoff delay: 1s, 2s, 4s...
      await new Promise(res => setTimeout(res, Math.pow(2, attempt) * 1000));
    }
  }
}`,
        filename: "services/aiService.ts"
      }
    },
    lessons: "If I rebuilt this today, I would build an automated prompt registry system with A/B testing to track response quality variations during backend updates.",
    techStack: ["Next.js", "FastAPI", "OpenAI API", "Redis", "Pydantic", "LangChain"]
  },

  "ci-cd-pipeline": {
    slug: "ci-cd-pipeline",
    title: "Automated CI/CD & AWS Deployment",
    subtitle: "Designing automated verification and multi-environment deployment pipelines with zero downtime.",
    category: "DevOps & Cloud",
    problem: {
      title: "The Problem",
      text: "Deploying codebase updates manually led to configuration drift, deployment windows, and occasional syntax/test failures leaking directly into production, causing service interruptions and disrupting tenant calculations.",
      details: [
        "Manual container builds introducing file system drift.",
        "Lack of automated test coverage gates during deployment runs.",
        "Production server downtime during software version upgrades.",
        "Lack of notification and rollbacks on pipeline deployment failures."
      ]
    },
    challenges: {
      title: "Technical Challenges Explained",
      items: [
        {
          question: "Why did we use GitHub Actions over Jenkins?",
          answer: "GitHub Actions runs directly in the host repository, eliminating server administration. It uses containerized execution runners and simplifies environment secret configurations via repository secrets."
        },
        {
          question: "Why did we design multi-stage Docker builds?",
          answer: "Standard container builds include build tools, compilers, and source logs which bloat production images and create security risks. Multi-stage builds compile code in a build container and copy only runtime files into a minimal runner image."
        },
        {
          question: "Why did we configure rolling deployments in ECS?",
          answer: "To achieve zero-downtime updates, we configured ECS rolling deployment parameters. It launches new container tasks and routes traffic to them only after they pass ALB health checks, then safely stops old containers."
        }
      ]
    },
    solution: {
      title: "Solution & Architecture",
      text: "We built an automated delivery pipeline. Code pushes trigger unit test execution and lint checking. Passed runs compile container configurations, push images to AWS ECR, and execute rolling task definition changes in AWS ECS cluster environments.",
      decisions: [
        {
          title: "Multi-Environment Deployment Staging",
          rationale: "Maintained isolated Dev, Staging, and Production deployment routes to allow thorough testing before deploying to production."
        },
        {
          title: "ALB Integration Health Checks",
          rationale: "Configured target groups to query task status paths, preventing ECS from routing user requests to half-booted containers."
        }
      ],
      codeExample: {
        language: "dockerfile",
        code: `# Multi-stage production Docker configuration
# --- BUILD STAGE ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- RUNTIME STAGE ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]`,
        filename: "Dockerfile"
      }
    },
    lessons: "If I rebuilt this today, I would implement automated canary deployments, routing a small percentage of traffic to the new version before rolling it out globally.",
    techStack: ["GitHub Actions", "Docker", "AWS ECS", "Slack Webhooks", "Python", "React", "Shell Scripting"]
  }
};
