# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Supabase project set up
- Environment variables ready

### Environment Variables Required

In your Vercel project settings, add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deploy Steps

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Or use Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

### Build Configuration

The project is configured with:
- ✅ Next.js 15.4.6 (auto-detected by Vercel)
- ✅ Optimized Tailwind CSS
- ✅ Framer Motion animations
- ✅ TypeScript support
- ✅ ESLint configuration
- ✅ Production-ready settings
- ✅ No custom vercel.json needed (uses defaults)

### Common Issues & Solutions

#### 1. **Tailwind CSS not loading**
- Ensure all content paths are included in `tailwind.config.ts`
- Check that CSS is properly imported in `globals.css`

#### 2. **Environment variables not working**
- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Verify they're added in Vercel dashboard under Settings > Environment Variables

#### 3. **Build failures**
- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Verify no ESLint errors

#### 4. **Supabase connection issues**
- Verify Supabase URL and anon key are correct
- Check that Supabase project is active
- Ensure RLS policies are properly configured

### Performance Optimizations

The app includes:
- Image optimization with Next.js Image component
- Bundle optimization for Framer Motion and Lucide React
- Static page generation where possible
- Optimized CSS with Tailwind
- Tree-shaking for unused code

### Build Output

Expected build success:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (8/8)
✓ Collecting build traces
✓ Finalizing page optimization
```

## 📊 Bundle Analysis

Main page size: ~149 kB (optimized)
- Shared JS: 99.6 kB
- Page-specific: 7.37 kB

## 🔧 Troubleshooting

If deployment fails:

1. **Check build locally first**
   ```bash
   npm run build
   npm run start
   ```

2. **Verify environment variables**
   ```bash
   # Create .env.local for local testing
   cp .env.example .env.local
   # Add your actual values
   ```

3. **Check Vercel logs**
   - Go to Vercel dashboard
   - Click on your deployment
   - Check the "Functions" and "Build Logs" tabs

4. **Common fixes**
   - Clear Vercel cache and redeploy
   - Ensure Node.js version compatibility
   - Check for any missing dependencies

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Local build successful
- [ ] GitHub repository connected to Vercel
- [ ] Domain configured (optional)
- [ ] Analytics enabled (optional)

Your K-Beauty AI landing page should now be live! 🎉