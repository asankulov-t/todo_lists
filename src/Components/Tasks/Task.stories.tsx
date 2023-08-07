import {Meta} from "@storybook/react";
import React from "react";
import { withActions } from '@storybook/addon-actions/decorator';
import Task from "./Task";
import {Provider} from "react-redux";
import {store} from "../../state/store";

const meta:Meta<typeof Task>={
    title:'Task Component',
    component:Task,
    parameters: {
        actions: {
            handles: ['mouseover', 'click .btn'],
        },
    },
    decorators: [withActions],
}
export const TaskBaseExample=(props:any)=>{
    return <Provider store={store}><Task title={'Task'} taskId={'854488'} tdId={'5455'} isDone={false}/></Provider>
}
export default meta