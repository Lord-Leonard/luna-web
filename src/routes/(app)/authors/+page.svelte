<script lang="ts">
    import {invalidateAll} from '$app/navigation';
    import DataTable from '$lib/components/DataTable.svelte';
    import TextareaInput from '$lib/components/inputs/TextareaInput.svelte';
    import TextInput from '$lib/components/inputs/TextInput.svelte';
    import ModalEditor from '$lib/components/ModalEditor.svelte';
    import {savable} from '$lib/savable';
    import {trpc} from '$lib/trpc/client';
    import type {RouterInputs} from '$lib/trpc/router';
    import {TRPCClientError} from '@trpc/client';
    import type {PageData} from '../../../../.svelte-kit/types/src/routes';

    export let data: PageData;

    let busy = false;
    let item: RouterInputs['authors']['save'] | null = null; // 👈 we're using a helper type
    let errors: { message: string; path: string[] }[] | null = null;

    const handleAdd = async () => {
        item = {id: null, firstName: '', lastName: '', bio: ''};
    };

    const handleEdit = async (e: CustomEvent<string>) => {
        busy = true;
        item = await trpc().authors.load.query(e.detail);
        busy = false;
    };

    const handleDelete = async (e: CustomEvent<string>) => {
        busy = true;
        await trpc().authors.delete.mutate(e.detail);
        await invalidateAll();
        busy = false;
    };

    const handleCancel = () => {
        item = null;
        errors = null;
    };

    const handleSave = async (e: { detail: RouterInputs['authors']['save'] }) => {
        busy = true;
        try {
            await trpc().authors.save.mutate(savable(e.detail));
            item = null;
            await invalidateAll();
        } catch (err) {
            if (err instanceof TRPCClientError) {
                errors = JSON.parse(err.message);
            } else {
                throw err;
            }
        } finally {
            busy = false;
        }
    };
</script>

<svelte:head>
    <title>Authors • Bookstall</title>
</svelte:head>

<DataTable
        {busy}
        title="Authors"
        items={data.authors}
        columns={[
    {
      title: 'Name',
      grow: true,
      accessor: ({ firstName, lastName }) => `${firstName} ${lastName}`
    },
    { title: 'Books', align: 'right', accessor: (author) => author._count.books }
  ]}
        on:add={handleAdd}
        on:edit={handleEdit}
        on:delete={handleDelete}
/>

<ModalEditor {item} itemName="author" on:cancel={handleCancel} on:save={handleSave}>
    <div class="grid">
        <TextInput name="firstName" label="First name" required {errors} {item}/>
        <TextInput name="lastName" label="Last name" required {errors} {item}/>
    </div>
    <TextareaInput name="bio" label="Bio" {errors} {item}/>
</ModalEditor>
