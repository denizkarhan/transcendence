
import { Injectable } from "@nestjs/common";


@Injectable()
export class Result {

	constructor(private status?:number, private message?:string) {}

	get _status(): number { return this.status; }
	get _message(): string { return this.message; }
}

export class DataResult<T> extends Result {
	constructor(private data: T, status?:number, message?:string) {
		super(status, message);
	}

	get _data(): T {return this.data;}

}