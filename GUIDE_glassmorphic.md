# Glassmorphic Component Guide

Quick reference for using the glassmorphic design system.

## 🎨 GlassCard Component

### Basic Usage
\`\`\`tsx
import GlassCard from '@/app/components/ui/GlassCard';

<GlassCard variant="strong">
  <p>Content here</p>
</GlassCard>
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'subtle' \| 'normal' \| 'strong' \| 'ultra' | 'normal' | Glass intensity |
| glow | 'blue' \| 'purple' \| 'pink' \| 'none' | 'none' | Glow color effect |
| hover | boolean | false | Adds hover scale effect |
| shimmer | boolean | false | Adds shimmer animation |
| className | string | '' | Additional Tailwind classes |

### Examples

#### Ultra Glass with Purple Glow
\`\`\`tsx
<GlassCard variant="ultra" glow="purple" hover shimmer>
  <h3>Premium Content</h3>
</GlassCard>
\`\`\`

#### Subtle Glass Background
\`\`\`tsx
<GlassCard variant="subtle" className="p-4">
  <p>Soft background element</p>
</GlassCard>
\`\`\`

#### Interactive Card
\`\`\`tsx
<GlassCard variant="strong" hover glow="blue" className="p-8">
  <h2>Click me!</h2>
</GlassCard>
\`\`\`

## 📦 Section Component

### Basic Usage
\`\`\`tsx
import Section from '@/app/components/ui/Section';

<Section id="my-section">
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | undefined | Section ID for navigation |
| noBorder | boolean | false | Removes bottom border |
| className | string | '' | Additional classes |

## 🎨 CSS Utility Classes

### Glass Effects
- `.glass-subtle` - Minimal blur (8px)
- `.glass` - Standard blur (12px)
- `.glass-strong` - Enhanced blur (16px)
- `.glass-ultra` - Maximum blur (20px)

### Glow Effects
- `.glow-blue` - Blue shadow glow
- `.glow-purple` - Purple shadow glow
- `.glow-pink` - Pink shadow glow

### Animations
- `.gradient-animated` - Animated gradient background
- `.shimmer` - Shimmer overlay effect
- `.transition-glass` - Smooth transitions

### Usage Examples
\`\`\`tsx
<div className="glass-ultra glow-purple shimmer rounded-2xl p-6">
  <p>Ultra glass with purple glow and shimmer</p>
</div>
\`\`\`

## 🎯 Color Gradients

### Gradient Text
\`\`\`tsx
<h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
  Gradient Text
</h1>
\`\`\`

### Gradient Backgrounds
\`\`\`tsx
<div className="bg-gradient-to-br from-blue-600 to-purple-600">
  Gradient Background
</div>
\`\`\`

## 🔧 Design System Constants

Import from `@/lib/constants/design`:

\`\`\`tsx
import { COLORS, ANIMATIONS, SPACING } from '@/lib/constants/design';

// Use in components
<div className={COLORS.gradients.primary}>
  {/* Content */}
</div>
\`\`\`

## 💡 Best Practices

1. **Layer Glass Effects**: Use different variants for depth
   \`\`\`tsx
   <GlassCard variant="strong">
     <GlassCard variant="ultra" className="p-4">
       Nested glass effect
     </GlassCard>
   </GlassCard>
   \`\`\`

2. **Combine with Gradients**: Add visual interest
   \`\`\`tsx
   <GlassCard variant="strong" glow="blue">
     <h3 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
       Title
     </h3>
   </GlassCard>
   \`\`\`

3. **Use Hover Effects**: Enhance interactivity
   \`\`\`tsx
   <GlassCard variant="ultra" hover className="cursor-pointer">
     Interactive Element
   </GlassCard>
   \`\`\`

4. **Match Glow to Content**: Create cohesive design
   - Blue glow for primary actions
   - Purple glow for special features
   - Pink glow for highlights

## 🎨 Color Combinations

### Professional
\`\`\`tsx
<GlassCard variant="strong" glow="blue">
  Blue-themed content
</GlassCard>
\`\`\`

### Creative
\`\`\`tsx
<GlassCard variant="ultra" glow="purple" shimmer>
  Purple-themed content
</GlassCard>
\`\`\`

### Highlight
\`\`\`tsx
<GlassCard variant="ultra" glow="pink" hover>
  Pink-themed content
</GlassCard>
\`\`\`

## 📱 Responsive Design

All glass components are fully responsive. Use Tailwind breakpoints:

\`\`\`tsx
<GlassCard 
  variant="strong" 
  className="p-4 md:p-8 lg:p-12"
>
  Responsive padding
</GlassCard>
\`\`\`

## ⚡ Performance Tips

1. Avoid excessive nesting of glass effects
2. Use `hover` prop only on interactive elements
3. Limit `shimmer` to key highlights
4. Combine multiple effects intentionally

## 🚀 Advanced Patterns

### Card Grid
\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, i) => (
    <GlassCard 
      key={item.id}
      variant="strong"
      glow={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'pink'}
      hover
    >
      {item.content}
    </GlassCard>
  ))}
</div>
\`\`\`

### Layered Glass
\`\`\`tsx
<div className="relative">
  <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-br from-blue-500 to-purple-500" />
  <GlassCard variant="ultra" className="relative">
    Content with background blur
  </GlassCard>
</div>
\`\`\`
