import {Application,Request,Response} from 'express';
import {AllUserData} from "../../../shared/to/all-user-data";
import {findDbThreadsPerUser} from "../persistence/findDbThreadsPerUser";
import { uniq, filter, keys } from 'lodash';
import {dbMessages, dbParticipants} from "../db-data";
import {Message} from "../../../shared/model/message";

export function apiGetUserThreads(app:Application) {

    app.route('/api/threads').get((req: Request, res: Response) => {

        const participantId = parseInt(req.headers['USERID']);

        const threadsPerUser = findDbThreadsPerUser(participantId);

        let messages: Message[] = [],
            participantIds: string[] = [];

        threadsPerUser.forEach(thread => {

            const threadMessages: Message[] = filter(dbMessages, (message:any) => message.threadId == thread.id);

            messages = messages.concat(threadMessages);

            participantIds  = participantIds.concat(keys(thread.participants));

        });

        const participants = uniq(participantIds.map(participantId => dbParticipants[participantId]));

        const response: AllUserData = {
          participants,
          messages,
            threads: threadsPerUser
        };

        res.status(200).json(response);

    });


}