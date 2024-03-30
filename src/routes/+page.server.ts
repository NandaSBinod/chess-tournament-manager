import { db } from '$lib/db.server'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    createTournament: async ({ request }) => {
        const info = Object.fromEntries(await request.formData()) as { 
            title: string,
            date_start: string,
            date_end: string,
            city: string,
        }
        const new_info = {...info, admin_id:1}
        try {
            await db.tournament.create({
                data: new_info
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not create new tournament.'})
        }
        return {
            status:201
        }
    }
} 