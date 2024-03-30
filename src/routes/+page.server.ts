import { db } from '$lib/db.server'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import type {PageServerLoad} from './$types'

export const actions: Actions = {
    createTournament: async ({ request }) => {
        const info = Object.fromEntries(await request.formData()) as { 
            title: string,
            date_start: string,
            date_end: string,
            city: string,
        }
        var new_info:any
        new_info = {...info, admin_id:1}
        new_info["date_start"] = new Date(new_info["date_start"])
        new_info["date_end"] = new Date(new_info["date_end"])
        try {
            await db.tournament.create({
                data: new_info
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not create new tournament.'})
        }
        return {
            success: true
        }
    }
} 

export async function load({ params }) {
	return {
		tournaments: await db.tournament.findMany()
	};
}