<script lang="ts">
    import { Button, ButtonGroup, Listgroup, Alert, Toast, Avatar, ListgroupItem, NumberInput, Modal } from 'flowbite-svelte';
    import { Datepicker } from 'flowbite-svelte';
    import { Drawer, CloseButton, Label, Input, Textarea, Select } from "flowbite-svelte";
    import {CheckCircleSolid, ExclamationCircleSolid, InfoCircleSolid} from 'flowbite-svelte-icons'
    import { sineIn } from "svelte/easing";
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    export let data: PageData;
  
      /** @type {import('./$types').ActionData} */
      export let form: any;
  
      let hiddenAdd = true;
      let hiddenEdit = true;
      let showDelete = false;
      let editId = 0;
      let deleteId = 0;
      let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
      };
      const handleCancelAdd = () => {
      hiddenAdd = true;
      };
      const handleCancelEdit = () => {
      hiddenEdit = true;
      };
      const handleCancelDelete = () => {
      showDelete = false;
      };
    type Player = { userid: Number, 
      fideid: Number,
      fide_rating: Number,
      birthdate: Date,
      sex: string,
      federation: string
      user: User
    };
    type User = {
      id: Number,
      phone: BigInt,
      last_name:   String
      first_name:  String
      user_type:   String
    }
    type nestedPlayer = {
      player: Player
    }

    // type Player_Tournaments = { player_id: Number
    //   tournament_id: Number
    //   tournament_player_id: Number
    // }
    let players: Array<Object> = [];
    // data.players.forEach((element: Tournament) => {
    //   links.push({ name: element.title, href: `/tournament/${element.id}`, id: element.id})
    // });
    data.players.forEach((element: nestedPlayer) => {
      const e = element.player
      players.push({ first_name: e.user.first_name, last_name: e.user.last_name, id: e.user.id})
    });
    // console.log("e---")
    // console.log(players)


  </script>
  
  <div class="flex flex-col justify-center h-screen p-80">
      <div class="flex justify-end items-center p-4">
          <div>
              <Button on:click={() => (hiddenAdd = false)}>Add Player</Button>
          </div>
      </div>
      <Listgroup items={players} let:item class="w-full" >
          <div class="flex">
              <ListgroupItem class="text-base">
                  {item.first_name  + " " + item.last_name}
              </ListgroupItem>
              <ButtonGroup>
                  <Button on:click={() => {showDelete = true; deleteId = item.id}}>Delete</Button>
              </ButtonGroup>
          </div> 
      </Listgroup>  
      {#if form?.success && (form?.action == "Add")} 
          <div class = "flex justify-center" >
              <Toast color="green">
                  <svelte:fragment slot="icon">
                  <CheckCircleSolid class="w-5 h-5" />
                  <span class="sr-only">Check icon</span>
                  </svelte:fragment>
                  Player added successfully!
              </Toast>
          </div>
      {:else if (form?.action == "Add") && form?.message}
           <!-- else content here -->
           <div class = "flex justify-center" >
              <Toast color="orange">
                  <svelte:fragment slot="icon">
                    <ExclamationCircleSolid class="w-5 h-5" />
                    <span class="sr-only">Warning icon</span>
                  </svelte:fragment>
                  Player could not be added
                </Toast>
           </div>
      {:else if form?.success && (form?.action == "Delete")}
        <div class = "flex justify-center" >
            <Toast color="green">
                <svelte:fragment slot="icon">
                <CheckCircleSolid class="w-5 h-5" />
                <span class="sr-only">Check icon</span>
                </svelte:fragment>
                Player removed successfully!
            </Toast>
        </div>
      {:else if (form?.action == "Delete") && form?.message}
      <div class = "flex justify-center" >
          <Toast color="orange">
              <svelte:fragment slot="icon">
                <ExclamationCircleSolid class="w-5 h-5" />
                <span class="sr-only">Warning icon</span>
              </svelte:fragment>
              Player could not be removed
            </Toast>
       </div>
      {/if}
  </div>
  
  
  
  
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenAdd} id="sidebar-add">
        <div class="flex items-center">
          <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">New Player</h5>
          <CloseButton on:click={() => (hiddenAdd = true)} class="mb-4 dark:text-white" />
        </div>
        <form method="POST" action="?/addPlayer" class="mb-6">
          <div class="mb-6">
            <Label for="id" class="block mb-2">User ID</Label>
            <Input type="number" id="user_id" name="user_id" required placeholder="Type player's user id" />
          </div>
          <NumberInput class="hidden" name="tournament_id" value={Number($page.params.id)} />
          <div class="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
            <Button type="submit" class="w-full">Add Player</Button>
            <Button class="w-full" color="light" on:click={handleCancelAdd}>
            <svg aria-hidden="true" class="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            Cancel
            </Button>
          </div>
        </form>
  </Drawer>

  
  <Modal bind:open={showDelete} title="" autoclose={false} size="sm" class="w-full">
      <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
      <p class="mb-4 text-gray-500 dark:text-gray-300 text-center">Are you sure you want to remove this player?</p>
      <form class="flex justify-center items-center space-x-4" method="POST" action="?/removePlayer">
          <Button color="light" on:click={handleCancelDelete}>No, cancel</Button>
          <NumberInput class="hidden" name="player_id" value={deleteId} />
          <NumberInput class="hidden" name="tournament_id" value={+$page.params.id} />
          <Button type="submit" color="red">Yes, I'm sure</Button>
      </form>
  </Modal>
  
  
  
  
  
  