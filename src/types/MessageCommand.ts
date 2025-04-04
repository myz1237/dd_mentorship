import { Message } from 'discord.js';
import { MyClient } from 'structures/Client';
import { staticConfig } from 'utils/config';

interface MessageRunOptions {
	client: MyClient;
	message: Message;
	// One Param Only
	param?: string;
}

type RunFunction = (options: MessageRunOptions) => unknown;

export enum MessageCommandEnum {
	test = 'test'
}

export type MessageCommandType = {
	name: MessageCommandEnum;
	roles: string[];
	execute: RunFunction;
};
