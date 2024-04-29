import { db } from '$lib/db.server'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import type {PageServerLoad} from './$types'

export const actions: Actions = {
    addPlayer: async ({ request }) => {
        console.log("In add")
        var info:any
        info = Object.fromEntries(await request.formData()) as { 
            user_id: any,
            tournament_id: any,
        }
        console.log(info)
        var new_info:any
        new_info = {}
        new_info["player_id"] = +info.user_id
        new_info["tournament_id"] = +info.tournament_id
        try {
            await db.players_Tournaments.create({
                data: new_info
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not add new player.', action: "Add"})
        }
        return {
            success: true,
            action: "Add"
        }
    },

    removePlayer: async ({ request }) => {
        console.log("In delete")
        const id = Object.fromEntries(await request.formData()) as { 
            player_id: string
            tournament_id: string
        }
        try {
            await db.players_Tournaments.delete ({
                where: {
                    player_id_tournament_id: {
                        player_id: +id.player_id,
                        tournament_id: +id.tournament_id
                    }
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not delete tournament.', action: "Delete"})
        }
        return {
            success: true,
            action: "Delete"
        }
    }
} 

export async function load({ params }) {
	return {
        players: await db.players_Tournaments.findMany({ where: { tournament_id: Number(params.id) }, select: {player: { include: {user: true} }}})
	};
}