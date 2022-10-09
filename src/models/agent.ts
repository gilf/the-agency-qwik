import { Task } from './task';

export interface Agent {
    agentID: string;
    codeName: string;
    firstName: string;
    lastName: string;
    imagePath: string;
    description: string;
    tasks?: Array<Task>;
}