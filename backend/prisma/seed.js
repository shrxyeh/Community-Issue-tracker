const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@community.com' },
    update: {},
    create: {
      email: 'admin@community.com',
      password: hashedPassword,
      name: 'System Admin'
    }
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample issues
  const sampleIssues = [
    {
      title: 'Broken Streetlight on Main Street',
      description: 'The streetlight near house #45 has been non-functional for 3 days, causing safety concerns.',
      category: 'Electricity',
      location: 'Main Street, near #45',
      status: 'Pending'
    },
    {
      title: 'Pothole on Highway Road',
      description: 'Large pothole causing vehicle damage. Urgent repair needed.',
      category: 'Roads',
      location: 'Highway Road, intersection with Oak Avenue',
      status: 'In-Progress'
    },
    {
      title: 'Water Leakage in Park Area',
      description: 'Continuous water leakage from underground pipe in Central Park.',
      category: 'Water',
      location: 'Central Park, Zone B',
      status: 'Pending'
    },
    {
      title: 'Waste Pickup Delayed',
      description: 'Waste has not been collected for over a week in Sector 5.',
      category: 'Waste',
      location: 'Sector 5, residential area',
      status: 'Resolved'
    },
    {
      title: 'Broken Fence at Community Center',
      description: 'The fence surrounding the community center is broken, posing security risks.',
      category: 'Safety',
      location: 'Community Center, East Gate',
      status: 'Pending'
    }
  ];

  for (const issue of sampleIssues) {
    await prisma.issue.create({
      data: issue
    });
  }

  console.log(`✅ Created ${sampleIssues.length} sample issues`);
  console.log('\n📝 Admin Credentials:');
  console.log('Email: admin@community.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
