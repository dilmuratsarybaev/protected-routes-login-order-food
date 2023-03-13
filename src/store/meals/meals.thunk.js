import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    deleteMealRequest,
    editMealRequest,
    getMealRequest,
    postMealRequest,
} from '../../api/mealService'

export const getMeals = createAsyncThunk(
    'meals/getMeals',
    async (payload, { getState, rejectWithValue }) => {
        try {
            const { data } = await getMealRequest(getState().auth.token)
            return data.data
        } catch (error) {
            return rejectWithValue('Something wents wrong')
        }
    }
)

export const postMeals = createAsyncThunk(
    'meals/getMeals',
    async (newMeal, { getState, rejectWithValue }) => {
        try {
            await postMealRequest(newMeal, getState().auth.token)
            getMeals()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const removeMeals = createAsyncThunk(
    'meals/deleteMeals',
    async (id, { getState, rejectWithValue }) => {
        try {
            await deleteMealRequest(id, getState().auth.token)
            getMeals()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateMeals = createAsyncThunk(
    'meals/updateMeals',
    async (data, { getState, rejectWithValue }) => {
        try {
            await editMealRequest(getState().auth.token, data)
            getMeals()
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
