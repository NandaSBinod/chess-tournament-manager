<script lang="ts">
  import { Button, ButtonGroup, Listgroup, Alert, Toast } from 'flowbite-svelte';
  import { Datepicker } from 'flowbite-svelte';
  import { Drawer, CloseButton, Label, Input, Textarea, Select } from "flowbite-svelte";
  import {CheckCircleSolid, ExclamationCircleSolid, InfoCircleSolid} from 'flowbite-svelte-icons'
  import { sineIn } from "svelte/easing";
  import type { PageData } from './$types';
  export let data: PageData;

	/** @type {import('./$types').ActionData} */
	export let form: any;

	let hidden = true;
	let transitionParams = {
	x: -320,
	duration: 200,
	easing: sineIn
	};
	const handleCancel = () => {
	hidden = true;
	};
  type Tournament = { id: Number, 
	title: any, 
	date_start: Date,
    date_end: Date,
    city: string, 
  };
  let links: Array<Object> = [];
  data.tournaments.forEach((element: Tournament) => {
	links.push({ name: element.title, href: `/tournament/${element.id}`})
  });
</script>

<div class="flex flex-col justify-center h-screen p-80">
	<div class="flex justify-end items-center p-4">
		<div>
			<ButtonGroup>
				<Button on:click={() => (hidden = false)}>Create Tournament</Button>
			</ButtonGroup>
		</div>
	</div>
	<Listgroup active items={links} let:item class="w-full" >
		{item.name}
	</Listgroup>  
	{#if form?.success} 
		<div class = "flex justify-center" >
			<Toast color="green">
				<svelte:fragment slot="icon">
				<CheckCircleSolid class="w-5 h-5" />
				<span class="sr-only">Check icon</span>
				</svelte:fragment>
				Tournament added successfully!
			</Toast>
		</div>
	{:else if form?.message}
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
	{/if}
</div>




<Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar-create">
	  <div class="flex items-center">
		<h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">New Tournament</h5>
		<CloseButton on:click={() => (hidden = true)} class="mb-4 dark:text-white" />
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
		  <Button class="w-full" color="light" on:click={handleCancel}>
			<svg aria-hidden="true" class="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			Cancel
		  </Button>
		</div>
	  </form>
</Drawer>




