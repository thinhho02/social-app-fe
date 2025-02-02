'use server';

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

import { create, deleted, update } from "@/apis/api";
import { Category } from "@/types/category";
import { Creator } from "@/types/creator";


function isValidText(text: string) {
    return !text || text.trim() === ''
}

export async function createCategory(state: { message: string } | undefined, formData: FormData) {
    const name = formData.get('name') as string
    const image = formData.get('imageUpload') as File

    if (isValidText(name) || image.size == 0) {
        return { message: 'Input required' }
    }

    const response = await create('category', formData)
    if (!response.success) {
        return { message: response.error as string };
    }

    revalidateTag('category')
    redirect('/admin/categories')
}

export async function updateCategory(category: Category, formData: FormData) {
    const name = formData.get('name') as string

    if (isValidText(name)) {
        return { message: 'Input required' }
    }

    const updatedData: Record<string, any> = {};

    if (name !== category.name) {
        updatedData.name = name
    }

    if ((formData.get('imageUpload') as File).size) {
        updatedData.imageUpload = formData.get('imageUpload') as File
    }

    if (Object.keys(updatedData).length === 0) {
        return { message: 'No changes detected' };
    }

    const finalFormData = new FormData();
    Object.entries(updatedData).map(([key, value]) => {
        finalFormData.append(key, value);
    });

    const response = await update(`category/${category._id}`, finalFormData)
    if (!response.success) {
        return { message: response.error as string };
    }

    revalidateTag('category')
    redirect('/admin/categories')
}



export async function createCreator(formData: FormData) {
    const name = formData.get('name') as string
    const image = formData.get('imageUpload') as File
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const tags = formData.get('tags') as string
    const status = formData.get('status') as string

    if (isValidText(name) ||
        isValidText(tags) ||
        isValidText(description) ||
        isValidText(status) ||
        isValidText(category) ||
        image.size == 0) {
        return { message: 'Input required' }
    }

    const response = await create('creator', formData)
    if (!response.success) {
        return { message: response.error as string };
    }

    revalidateTag('creator')
    revalidateTag('category')
    revalidateTag('tag')

    redirect('/admin/creators')
}

export async function updateCreator(creator: Creator, formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string
    const tags: string[] = JSON.parse(formData.get('tags') as string)

    if (isValidText(name) ||
        tags.length === 0 ||
        isValidText(description) ||
        isValidText(status) ||
        isValidText(category)) {
        return { message: 'Input required' }
    }
    if ((formData.get('imageUpload') as File).size > 1 * 1024 * 1024) {
        return { message: 'File size exceeds 1MB' }
    }
    const updatedData: Record<string, any> = {};

    const fieldsToCompare = ["name", "description", "status"];
    fieldsToCompare.map((field) => {
        const newValue = formData.get(field) as string;
        const oldValue = creator[field as keyof typeof creator];

        if (newValue !== null && newValue !== String(oldValue)) {
            updatedData[field] = newValue;
        }
    });

    if (category !== creator.category._id) {
        updatedData.category = category;
    }

    if ((formData.get('imageUpload') as File).size) {
        updatedData.imageUpload = formData.get('imageUpload') as File
    }

    const oldTags = creator.tags.map((tag) => tag.name);
    if (JSON.stringify(tags) !== JSON.stringify(oldTags)) {
        updatedData.tags = tags;
    }

    if (Object.keys(updatedData).length === 0) {
        return { message: 'No changes detected' };
    }
    console.log(updatedData)
    const finalFormData = new FormData();
    Object.entries(updatedData).map(([key, value]) => {
        if (Array.isArray(value)) {
            finalFormData.append(key, JSON.stringify(value));
        } else {
            finalFormData.append(key, value as string);
        }
    });
    const response = await update(`creator/${creator._id}`, finalFormData)
    if (!response.success) {
        return { message: response.error as string };
    }

    revalidateTag('creator')
    revalidateTag('category')
    revalidateTag('tag')

    redirect('/admin/creators')
}

export async function deleteCategory(id: string) {
    const response = await deleted('category', id)
    if(!response.success){
        return { message: response.error as string }
    }
    revalidateTag('creator')
    revalidateTag('category')
    revalidateTag('tag')
}

export async function deleteCreator(id: string) {
    const response = await deleted('creator', id)
    if(!response.success){
        return { message: response.error as string }
    }
    revalidateTag('creator')
    revalidateTag('category')
    revalidateTag('tag')
}