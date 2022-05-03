import React from "react";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { chooseName, choosePrice, chooseDescription, chooseCameraQuality, chooseFlightTime, 
    chooseMaxSpeed, chooseDimensions, chooseWeight, chooseCostOfProduction, 
    chooseSeries } from '../../redux/slices/rootSlice'
import { Input } from "../sharedComponents";
import { server_calls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface DroneFormProps{
    id?:string;
    data?:{}
}

interface DroneState{
    name: string;
    price: number;
    description: string;
    camera_quality: string;
    flight_time: string;
    max_speed: string;
    dimensions: string;
    weight: string;
    cost_of_production:number;
    series: string;
}

export const DroneForm = ( props:DroneFormProps ) => {
    const dispatch = useDispatch();
    let { droneData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<DroneState>(state => state.name)
    const price = useSelector<DroneState>(state => state.price)
    const description = useSelector<DroneState>(state => state.description)
    const camera_quality = useSelector<DroneState>(state => state.camera_quality)
    const flight_time = useSelector<DroneState>(state => state.flight_time)
    const max_speed = useSelector<DroneState>(state => state.max_speed)
    const dimensions = useSelector<DroneState>(state => state.dimensions)
    const weight = useSelector<DroneState>(state => state.weight)
    const cost_of_production = useSelector<DroneState>(state => state.cost_of_production)
    const series = useSelector<DroneState>(state => state.series)

    const { register, handleSubmit } = useForm({ })

    const onSubmit = async ( data:any, event:any ) => {
        console.log(props.id)

        if (props.id!) {
            await server_calls.update(props.id!, data)
            console.log(`Updated drone: ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            dispatch(chooseDescription(data.description))
            dispatch(chooseCameraQuality(data.camera_quality))
            dispatch(chooseFlightTime(data.flight_time))
            dispatch(chooseMaxSpeed(data.max_speed))
            dispatch(chooseDimensions(data.dimensions))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseCostOfProduction(data.cost_of_production))
            dispatch(chooseSeries(data.series))

            await server_calls.create(store.getState())
            window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Drone Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>
                <div>
                    <label htmlFor="camera_quality">Camera Quality</label>
                    <Input {...register('camera_quality')} name="camera_quality" placeholder="Camera Quality"/>
                </div>
                <div>
                    <label htmlFor="flight_time">Flight Time</label>
                    <Input {...register('flight_time')} name="flight_time" placeholder="Flight Time"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description" />
                </div>
                <div>
                    <label htmlFor="dimensions">Dimensions</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="Dimensions"/>
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="Max Speed"/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight"/>
                </div>
                <div>
                    <label htmlFor="cost_of_production">Cost Of Production</label>
                    <Input {...register('cost_of_production')} name="cost_of_production" placeholder="Cost Of Production"/>
                </div>
                <div>
                    <label htmlFor="series">Series</label>
                    <Input {...register('series')} name="series" placeholder="Series"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}