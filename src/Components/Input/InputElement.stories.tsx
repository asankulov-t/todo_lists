import InputElement from "./InputElement";
import React from "react";
import {Meta} from "@storybook/react";
import { withActions } from '@storybook/addon-actions/decorator';


const meta:Meta<typeof InputElement>={
    title:'InputElement Component',
    component:InputElement,
    parameters: {
        actions: {
            handles: ['mouseover', 'click .btn'],
        },
    },
    decorators: [withActions],
}
export const InputElementBaseExample=(props:any)=>{
    return <InputElement add={(title:string)=>{alert(title)}}/>
}
export default meta