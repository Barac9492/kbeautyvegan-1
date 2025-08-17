#!/usr/bin/env tsx

// Manual data update script for development and testing
// Run with: npm run update-data [dataType]

import { DataUpdater } from '../src/lib/data-updater'

const dataType = process.argv[2]
const validTypes = ['trends', 'products', 'market', 'community', 'insights', 'all']

if (!dataType || !validTypes.includes(dataType)) {
  console.error('❌ Invalid or missing data type')
  console.log('')
  console.log('Usage: npm run update-data <dataType>')
  console.log('')
  console.log('Valid data types:')
  console.log('- trends     (K-beauty trends and social data)')
  console.log('- products   (Product catalog and pricing)')
  console.log('- market     (Market research and statistics)')
  console.log('- community  (User stats and predictions)')
  console.log('- insights   (AI beauty technology research)')
  console.log('- all        (Update all data types)')
  console.log('')
  console.log('Examples:')
  console.log('npm run update-data trends')
  console.log('npm run update-data all')
  process.exit(1)
}

async function manualUpdate() {
  console.log(`🔄 Starting manual update for: ${dataType}`)
  console.log('')

  const updater = new DataUpdater()
  const startTime = Date.now()

  try {
    if (dataType === 'all') {
      console.log('📊 Updating all data types...')
      const types = ['trends', 'products', 'market', 'community', 'insights']
      
      for (const type of types) {
        console.log(`\n🔄 Updating ${type}...`)
        const success = await updater.triggerUpdate(type)
        
        if (success) {
          console.log(`✅ ${type} updated successfully`)
        } else {
          console.log(`❌ ${type} update failed`)
        }
      }
    } else {
      console.log(`🔄 Updating ${dataType}...`)
      const success = await updater.triggerUpdate(dataType)
      
      if (success) {
        console.log(`✅ ${dataType} updated successfully`)
      } else {
        console.log(`❌ ${dataType} update failed`)
        process.exit(1)
      }
    }

    const executionTime = Date.now() - startTime
    console.log('')
    console.log(`⏱️ Total execution time: ${executionTime}ms`)
    console.log('🎉 Manual update completed!')
    console.log('')
    console.log('💡 Tips:')
    console.log('- Check /admin/data-management for detailed status')
    console.log('- Use the admin dashboard to monitor data freshness')
    console.log('- Set up Vercel cron jobs for automated updates')

  } catch (error) {
    console.error('❌ Manual update failed:', error)
    process.exit(1)
  }
}

// Run the manual update
manualUpdate()