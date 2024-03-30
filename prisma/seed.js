import { db } from '$lib/db.server'

async function main() {
    await db.user.createMany({
        data: [
          { id: 1, phone: 1234567890, last_name: 'Sreetha Binod', first_name: 'Nanda', user_type: 'Admin'},
          { id: 2, phone: 2345678901, last_name: 'Carlsen', first_name: 'Magnus', user_type: 'Player'}
        ]
    })
    
    await db.player.create({
        data: { userid: 2, fideid: 1503014, fide_rating: 2830, birthdate: new Date('1990-11-30'), sex: 'M', federation: 'NOR'}
    })
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })