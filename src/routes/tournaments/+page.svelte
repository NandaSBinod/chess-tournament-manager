<script lang="ts">
  import { Button, ButtonGroup, Listgroup, Alert, Toast, Avatar, ListgroupItem, NumberInput, Modal, A, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { Datepicker } from 'flowbite-svelte';
  import { Drawer, CloseButton, Label, Input, Textarea, Select } from "flowbite-svelte";
  import {ArrowRightOutline, CheckCircleSolid, ChevronDownOutline, ExclamationCircleSolid, InfoCircleSolid} from 'flowbite-svelte-icons'
  import { sineIn } from "svelte/easing";
  import type { PageData } from './$types';
  export let data: PageData;

	/** @type {import('./$types').ActionData} */
	export let form: any;

	let hiddenCreate = true;
	let hiddenEdit = true;
	let showDelete = false;
	let editId = 0;
	let deleteId = 0;
	let selected:any;
	let transitionParams = {
	x: -320,
	duration: 200,
	easing: sineIn
	};
	let hidden7 = true;
	let transitionParamsTop = {
		y: -320,
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
	};
  type Tournament = { id: Number, 
	title: any, 
	date_start: Date,
    date_end: Date,
    city: string, 
  };
  let links: Array<Object> = [];
  data.tournaments.forEach((element: Tournament) => {
	links.push({ name: element.title, href: `/tournaments/${element.id}`, id: element.id})
  });
  let selected_city: any;
  let selected_num: any;
  let player_ranges = [
    { value: [0, 5], name: '0-5' },
    { value: [6, 10], name: '6-10' },
    { value: [11, 20], name: '11-20' },
	{ value: [21, 50], name: '21-50' },
	{ value: [51, Number.POSITIVE_INFINITY], name: '>50' }
  ];
  let cities = [
    { value: 'West Lafayette', name: 'West Lafayette' },
    { value: 'Indianapolis', name: 'Indianapolis' }
  ];
</script>

<div class="flex flex-col justify-center h-screen p-80">
	<div class="flex justify-end items-center p-4 space-x-2">
		<Button color="light" on:click={() => (hidden7 = false)}>Generate Report</Button>
		<Button on:click={() => (hiddenCreate = false)}>Create Tournament</Button>
	</div>
	<Listgroup items={links} let:item class="w-full" >
		<div class="flex">
			<ListgroupItem active href={item.href} class="text-base">
				{item.name}
			</ListgroupItem>
			<ButtonGroup>
				<Button on:click={() => {hiddenEdit = false; editId = item.id}}>Edit</Button>
				<Button on:click={() => {showDelete = true; deleteId = item.id}}>Delete</Button>
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


<Drawer placement="top" width="w-full" transitionType="fly" transitionParams={transitionParamsTop} bind:hidden={hidden7} id="sidebar7">
	<div class="flex items-center">
	  <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
		<InfoCircleSolid class="w-5 h-5 me-2.5" /> Select Tournament Parameters
	  </h5>
	  <CloseButton on:click={() => (hidden7 = true)} class="mb-4 dark:text-white" />
	</div>
	<form action="../report" class="flex justify-around mx-10 py-10">
		<div class="flex items-center">
			<div>
				<Label for="range_start" class="mx-4 my-1">Range Start</Label>
				<Input required id="range_start" name="range_start" type="date"/>
			</div>
			<span class="mx-4 text-gray-500">to</span>
			<div>
				<Label for="range_end" class="mx-4 my-1">Range End</Label>
				<Input required id="range_end" name="range_end" type="date"/>
			</div>
		</div>
		<!-- <div class="flex justify-between">
			<Input id="start_date" name="date_start" type="date" />
			<Input id="start_date" name="date_start" type="date" />
		</div> -->
		<div>
			<Label for="city" class="mx-4 py-0">City</Label>
			<Select id="city" name="city" class="mt-2" items={cities} bind:value={selected}/>
		</div>
		<div>
			<Label for="player_no" class="mx-4 py-0">Number of Players</Label>
			<Select id="player_no" name="player_no" class="mt-2" items={player_ranges}/>
		</div>
		<div class="flex items-center">
			<Button class="h-10" type="submit">Generate <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
		</div>
	</form>
	
	<div></div>
	<!-- <p class="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">
	Supercharge your hiring by taking advantage of our <A href="/" class="text-primary-600 underline dark:text-primary-500 hover:no-underline">limited-time sale</A> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.
	</p>
	<Button color="light" href="/">Learn more</Button>
	<Button href="/" class="px-4">Get access <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
	 -->
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






