import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db.server'
import { Prisma } from '@prisma/client';

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;

export async function load({ params, url }) {
    let range_start = new Date(url.searchParams.get('range_start')!)
    let range_end = new Date(url.searchParams.get('range_end')!)
    let city = url.searchParams.get('city')!
    let player_no = JSON.parse("[" + url.searchParams.get('player_no') + "]");
    
    // const q = Prisma.sql
    // , 
    let tournaments:any = await db.$queryRaw`SELECT Tournament.*, COUNT(Players_Tournaments.player_id) AS player_count
    FROM Tournament
    LEFT JOIN Players_Tournaments ON Tournament.id = Players_Tournaments.tournament_id
    LEFT JOIN Player ON Player.userid = Players_Tournaments.player_id
    WHERE city = ${city} 
    AND date_start <= ${range_end}
    AND date_start >= ${range_start}
    GROUP BY Tournament.id
    HAVING player_count BETWEEN ${player_no[0]} AND ${player_no[1]}
    `
    // let tournaments = await db.$queryRaw`SELECT * FROM report`

    let stats:any = await db.$queryRaw`WITH report AS (SELECT Tournament.*, COUNT(Players_Tournaments.player_id) AS player_count
    FROM Tournament
    LEFT JOIN Players_Tournaments ON Tournament.id = Players_Tournaments.tournament_id
    WHERE city = ${city} 
    AND date_start <= ${range_end}
    AND date_start >= ${range_start}
    GROUP BY Tournament.id
    HAVING player_count BETWEEN ${player_no[0]} AND ${player_no[1]}
    )
    SELECT CAST(AVG(fide_rating) AS SIGNED) AS avg_rating, COUNT(DISTINCT federation) AS fed_num, CONCAT(COUNT(case sex when 'M' then 1 else null end), ":", COUNT(case sex when 'F' then 1 else null end)) AS ratio, AVG(DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(birthdate, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(birthdate, '00-%m-%d'))) AS avg_age FROM report
    LEFT JOIN Players_Tournaments ON report.id = Players_Tournaments.tournament_id
    LEFT JOIN Player ON Player.userid = Players_Tournaments.player_id 
    `

    console.log(stats)



	return {
        // players: await db.players_Tournaments.findMany({ where: { tournament_id: Number(params.id) }, select: {player: { include: {user: true} }}}),
        tournaments: tournaments,
        stats: stats
	};
}

// export const actions: Actions = {
//     default: async ({ request }) => {
//         const info = Object.fromEntries(await request.formData()) as { 
//             player_no: string,
//             range_start: string,
//             range_end: string,
//             city: string,
//         }
//         console.log(info)
//     }
// }