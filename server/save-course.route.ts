import {Request, Response} from 'express';
import {COURSES} from "./db-data";


export function saveCourse(req: Request, res: Response) {

    const id = req.params["id"],
        changes = req.body;

    console.log("Saving course", id, JSON.stringify(changes));


    COURSES[id] = {
        ...COURSES[id],
        ...changes
    };

    res.status(200).json(COURSES[id]);

}
