<script lang="ts">
  import { Button, ButtonGroup, Listgroup, Alert, Toast, Avatar, ListgroupItem, NumberInput, Modal } from 'flowbite-svelte';
  import { Datepicker } from 'flowbite-svelte';
  import { Drawer, CloseButton, Label, Input, Textarea, Select } from "flowbite-svelte";
  import {CheckCircleSolid, ExclamationCircleSolid, InfoCircleSolid} from 'flowbite-svelte-icons'
  import { sineIn } from "svelte/easing";
  import type { PageData } from './$types';
  export let data: PageData;

	/** @type {import('./$types').ActionData} */
	export let form: any;

	let hiddenCreate = true;
	let hiddenEdit = true;
	let showDelete = false;
	let hiddenDelete = true;
	let editId = 0;
	let deleteId = 0;
	let transitionParams = {
	x: -320,
	duration: 200,
	easing: sineIn
	};
	const handleCancelCreate = () => {
	hiddenCreate = true;
	};
	const handleCancelEdit = () => {
	hiddenEdit = true;
	};
	const handleCancelDelete = () => {
	showDelete = false;
	hiddenDelete = true;
	};
  type Tournament = { id: Number, 
	title: any, 
	date_start: Date,
    date_end: Date,
    city: string, 
  };
  let links: Array<Object> = [];
  data.tournaments.forEach((element: Tournament) => {
	links.push({ name: element.title, href: `/tournament/${element.id}`, id: element.id})
  });
</script>

<div class="flex flex-col justify-center h-screen p-80">
	<div class="flex justify-end items-center p-4">
		<div>
			<Button on:click={() => (hiddenCreate = false)}>Create Tournament</Button>
		</div>
	</div>
	<Listgroup items={links} let:item class="w-full" >
		<div class="flex">
			<ListgroupItem active href={item.href} class="text-base">
				{item.name}
			</ListgroupItem>
			<ButtonGroup>
				<Button on:click={() => {hiddenEdit = false; editId = item.id}}>Edit</Button>
				<Button on:click={() => {showDelete = true; hiddenDelete = false; deleteId = item.id}}>Delete</Button>
			</ButtonGroup>
		</div>
	</Listgroup>  
	{#if form?.success && (form?.action == "Create")} 
		<div class = "flex justify-center" >
			<Toast color="green">
				<svelte:fragment slot="icon">
				<CheckCircleSolid class="w-5 h-5" />
				<span class="sr-only">Check icon</span>
				</svelte:fragment>
				Tournament added successfully!
			</Toast>
		</div>
	{:else if (form?.action == "Create") && form?.message}
		 <!-- else content here -->
		 <div class = "flex justify-center" >
			<Toast color="orange">
				<svelte:fragment slot="icon">
				  <ExclamationCircleSolid class="w-5 h-5" />
				  <span class="sr-only">Warning icon</span>
				</svelte:fragment>
				Tournament Creation Failed
			  </Toast>
		 </div>
	{:else if form?.success && (form?.action == "Edit")}
	<div class = "flex justify-center" >
		<Toast color="green">
			<svelte:fragment slot="icon">
			<CheckCircleSolid class="w-5 h-5" />
			<span class="sr-only">Check icon</span>
			</svelte:fragment>
			Tournament updated successfully!
		</Toast>
	</div>
	{:else if (form?.action == "Edit") && form?.message}
	<div class = "flex justify-center" >
		<Toast color="orange">
			<svelte:fragment slot="icon">
			  <ExclamationCircleSolid class="w-5 h-5" />
			  <span class="sr-only">Warning icon</span>
			</svelte:fragment>
			Tournament Update Failed
		  </Toast>
	 </div>
	 {:else if form?.success && (form?.action == "Delete")}
	<div class = "flex justify-center" >
		<Toast color="green">
			<svelte:fragment slot="icon">
			<CheckCircleSolid class="w-5 h-5" />
			<span class="sr-only">Check icon</span>
			</svelte:fragment>
			Tournament deleted successfully!
		</Toast>
	</div>
	{:else if (form?.action == "Delete") && form?.message}
	<div class = "flex justify-center" >
		<Toast color="orange">
			<svelte:fragment slot="icon">
			  <ExclamationCircleSolid class="w-5 h-5" />
			  <span class="sr-only">Warning icon</span>
			</svelte:fragment>
			Tournament Delete Failed
		  </Toast>
	 </div>
	{/if}
</div>




<Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenCreate} id="sidebar-create">
	  <div class="flex items-center">
		<h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">New Tournament</h5>
		<CloseButton on:click={() => (hiddenCreate = true)} class="mb-4 dark:text-white" />
	  </div>
	  <form method="POST" action="?/createTournament" class="mb-6">
		<div class="mb-6">
		  <Label for="title" class="block mb-2">Title</Label>
		  <Input id="title" name="title" required placeholder="Type tournament title" />
		</div>
		<div class="mb-6">
			<Label for="start_date" class="block mb-2">Start Date</Label>
			<Input id="start_date" name="date_start" required type="date" />
		</div>
		<div class="mb-6">
			<Label for="end_date" class="block mb-2">End Date</Label>
			<Input id="end_date" name="date_end" required type="date" />
		</div>
		<div class="mb-6">
			<Label for="city" class="block mb-2">City</Label>
			<Input id="city" name="city" required placeholder="Type city name" />
		</div>
		<div class="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
		  <Button type="submit" class="w-full">Add Tournament</Button>
		  <Button class="w-full" color="light" on:click={handleCancelCreate}>
			<svg aria-hidden="true" class="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			Cancel
		  </Button>
		</div>
	  </form>
</Drawer>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenEdit} id="sidebar-edit">
	<div class="flex items-center">
	  <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Edit Tournament</h5>
	  <CloseButton on:click={() => (hiddenEdit = true)} class="mb-4 dark:text-white" />
	</div>
	<form method="POST" action="?/editTournament" class="mb-6">
	  <div class="mb-6">
		<Label for="title" class="block mb-2">Title</Label>
		<Input id="title" name="title"/>
	  </div>
	  <div class="mb-6">
		  <Label for="start_date" class="block mb-2">Start Date</Label>
		  <Input id="start_date" name="date_start" type="date" />
	  </div>
	  <div class="mb-6">
		  <Label for="end_date" class="block mb-2">End Date</Label>
		  <Input id="end_date" name="date_end" type="date" />
	  </div>
	  <div class="mb-6">
		  <Label for="city" class="block mb-2">City</Label>
		  <Input id="city" name="city" />
	  </div>

	  <NumberInput class="hidden" name="id" value={editId} />

	  <div class="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
		<Button type="submit" class="w-full">Edit Tournament</Button>
		<Button class="w-full" color="light" on:click={handleCancelEdit}>
		  <svg aria-hidden="true" class="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
		  Cancel
		</Button>
	  </div>
	</form>
</Drawer>

<Modal bind:open={showDelete} title="" autoclose={false} size="sm" class="w-full">
    <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
    <p class="mb-4 text-gray-500 dark:text-gray-300 text-center">Are you sure you want to delete this item?</p>
	<form class="flex justify-center items-center space-x-4" method="POST" action="?/deleteTournament">
		<Button color="light" on:click={handleCancelDelete}>No, cancel</Button>
		<NumberInput class="hidden" name="id" value={deleteId} />
		<Button type="submit" color="red">Yes, I'm sure</Button>
	</form>
</Modal>





