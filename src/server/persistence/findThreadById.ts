import {dbThreads} from "../db-data";
import {Thread} from "../../../shared/model/thread";
import {find, values} from 'lodash';



export function findThreadById(threadId:number) {

    const threads: Thread[] = <any> values(dbThreads);

    return find(threads,thread => thread.id === threadId);
}