import { Participant } from "../../../shared/model/participant";
import { Thread } from "../../../shared/model/thread";
import { Message } from "../../../shared/model/message";

export interface ApplicationState {
    participants: {[key:number]:Participant},
    threads: {[key:number]:Thread},
    messages: {[key:number]: Message},
    userId:number;
    currentThreadId: number
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    participants: {},
    threads: {},
    messages: {},
    userId: 1,
    currentThreadId: undefined
};