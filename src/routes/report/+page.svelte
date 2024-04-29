<script lang="ts">
    import { Button, ButtonGroup, Listgroup, Alert, Toast, Avatar, ListgroupItem, NumberInput, Modal, Heading, Li, List } from 'flowbite-svelte';
    import { Datepicker } from 'flowbite-svelte';
    import { Drawer, CloseButton, Label, Input, Textarea, Select } from "flowbite-svelte";
    import {CheckCircleSolid, ExclamationCircleSolid, InfoCircleSolid} from 'flowbite-svelte-icons'
    import { sineIn } from "svelte/easing";
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    export let data: PageData;
  
    // /** @type {import('./$types').ActionData} */
    // export let form: any;

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

    // don't need above


    // let players: Array<Object> = [];
    // data.players.forEach((element: nestedPlayer) => {
    //   const e = element.player
    //   players.push({ first_name: e.user.first_name, last_name: e.user.last_name, id: e.user.id})
    // });

    type Tournament = { id: Number, 
    title: any, 
    date_start: Date,
      date_end: Date,
      city: string, 
    };

    type Stats = {
        avg_rating: BigInt,
        fed_num: BigInt,
        ratio: string,
        avg_age: Number
    }
    let links: Array<Object> = [];
    // console.log(data.stats);
    data.tournaments.forEach((element: Tournament) => {
    links.push({ name: element.title, href: `/tournaments/${element.id}`, id: element.id})
    });

    let avg_rating:any
    let avg_age:any
    let ratio:any
    let fed:any

    data.stats.forEach((element: Stats) => {
        avg_rating = element.avg_rating
        avg_age = element.avg_age
        ratio = element.ratio
        fed = element.fed_num
    });

  </script>

<!-- <div class="flex flex-col justify-center h-screen p-80">
    <Listgroup items={players} let:item class="w-full" >
        <div class="flex">
            <ListgroupItem class="text-base">
                {item.first_name  + " " + item.last_name}
            </ListgroupItem>
        </div> 
    </Listgroup>
</div> -->


<div class="flex flex-col justify-center items-center h-screen p-60 space-y-20">
    <div class="flex justify-around space-x-20">
        <div class='flex flex-col items-center'>
            <List list="none">
                <Li>{avg_rating}</Li>
            </List>
            <Heading color="font-medium" tag="h5">Average FIDE Rating</Heading>
        </div>
        <div class='flex flex-col items-center'>
            <List list="none">
                <Li>{avg_age}</Li>
            </List>
            <Heading color="font-medium" tag="h5">Average Age</Heading>
        </div>
        <div class='flex flex-col items-center'>
            <List list="none">
                <Li>{ratio}</Li>
            </List>
            <Heading color="font-medium" tag="h5">Male to Female Ratio</Heading>
        </div>
        <div class='flex flex-col items-center'>
            <List list="none">
                <Li>{fed}</Li>
            </List>
            <Heading color="font-medium" tag="h5">Countries Represented</Heading>
        </div>
    </div>
    <Listgroup items={links} let:item class="w-4/5" >
		<div class="flex">
			<ListgroupItem class="text-base">
				{item.name} 
			</ListgroupItem>
		</div>
	</Listgroup> 
</div>