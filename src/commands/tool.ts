import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from 'discord.js';
import { pipe } from 'fp-ts/lib/function';
import { Command } from 'structures/Command';
import { CommandNameEnum } from 'types/Command';
import * as TE from 'fp-ts/TaskEither';
import _ from 'lodash';
import { DiscordBotError } from 'utils/error';

export default new Command({
	name: CommandNameEnum.MentorshipTool,
	type: ApplicationCommandType.ChatInput,
	description: 'Tool command',
	options: [
		{
			name: 'group_dm',
			description: 'Send DM to all users, please use it wisely',
			type: ApplicationCommandOptionType.Subcommand
		},
		{
			name: 'test',
			description: 'just test',
			type: ApplicationCommandOptionType.Subcommand
		}
	],
	execute: async ({ interaction, args }) => {
		const subCommandName = args.getSubcommand();

		if (subCommandName === 'group_dm') {
			await interaction.deferReply({ ephemeral: true });
			const memberCollection = await interaction.guild.members.fetch();

			if (memberCollection.size === 0) {
				return interaction.followUp({
					content: 'No member found in this guild'
				});
			}
			const realMember = [...memberCollection.values()].filter(
				(m) => !m.user.bot && !excludeDiscordId.includes(m.id)
			);
			const result = {
				success: 0,
				failToCreateDM: 0,
				failToSendMessage: 0
			};
			const message = `Hi there,

I'm excited to announce that the **Developer DAO Mentorship Programme** is getting ready for **Season 3**, and we'd love to hear from you!

If you're interested in participating as a mentor, mentee, or sponsor/partner, please fill out the quick interest form. You can find the form in the <#1349405197516013642> channel in the Developer DAO Discord server.

Your input will help us make the programme a success.

If you prefer **not** to receive further messages, just reply with \`STOP\`, and we won't contact you again.

Thank you for being part of the Developer DAO community.

- Piablo
(Co-founder: D_D Mentorship/D_D Academy)
`;
			const action = (member: GuildMember) =>
				pipe(
					TE.tryCatch(
						() => member.createDM(),
						(e) => {
							console.log('fail to create DM ', DiscordBotError.getErrorMessage(e));
							return ++result.failToCreateDM;
						}
					),
					TE.chain((dmChannel) =>
						TE.tryCatch(
							() =>
								dmChannel.send({
									content: message
								}),
							(e) => {
								console.log(
									'fail to send message ',
									DiscordBotError.getErrorMessage(e)
								);
								return ++result.failToSendMessage;
							}
						)
					),
					TE.map(() => ++result.success)
				);
			await interaction.followUp({
				content: `Sending message to ${realMember.length} members...`
			});

			for (const eachMember of realMember) {
				await new Promise((r) => setTimeout(r, 15000));
				await action(eachMember)();
			}

			return interaction.editReply({
				content: `- Successfully sent message to ${result.success} members.\n- Failed to create DM to ${result.failToCreateDM} members.\n- Failed to send message to ${result.failToSendMessage} members`
			});
		}

		if (subCommandName === 'test') {
			const channel = await interaction.user.createDM();
			await channel.send({
				content: 'Hello'
			});
			return interaction.reply({
				content: 'Test',
				ephemeral: true
			});
		}

		return interaction.reply({
			content: 'No subcommand is matched',
			ephemeral: true
		});
	}
});

const excludeDiscordId: string[] = [
	'549106709109669904',
	'869233194959003648',
	'354384051446087680',
	'731709354461364274',
	'567421313782775873',
	'477319419928903690',
	'700760180811366420',
	'423049349577179137',
	'119818938845495298',
	'622851026789072896',
	'225427770182729728',
	'878172521801875456',
	'702954417946886286',
	'779729276911616000',
	'577430192272703498',
	'417620511791775748',
	'731709354461364274',
	'785433462429057034',
	'207236182592061442',
	'587378166390325268',
	'703806919835648071',
	'571660928282525706',
	'354384051446087680',
	'906522102335668234',
	'120152986499416064',
	'730282901576482826',
	'730282901576482826',
	'829035561385590904',
	'961730944170090516',
	'550003127525572609',
	'622820555950784532',
	'826560677753258014',
	'459340462554349570',
	'884613846550073356',
	'174423037813194753',
	'781614900618461224',
	'339271217779441674',
	'379723128366170112',
	'935999176393781258',
	'537819950392410144',
	'416225100438831104',
	'746081053848109097',
	'363154717154476033',
	'187088299817435136',
	'911084271324782592',
	'312231078482018305',
	'236856578714763265',
	'367010251343659009',
	'812342397790191638',
	'622457724239872011',
	'699679284901445653',
	'909406455252279297',
	'841644099471015956',
	'495930748810035201',
	'737256652062851149',
	'280383996326576128',
	'422775982240563200',
	'911843061108195359',
	'151673240878710784',
	'771262680437620759',
	'856980943242919987',
	'716942113618788403',
	'908392557258604544',
	'749430194535923752',
	'759320580867489823',
	'628989378802483215',
	'405375278676967435',
	'843395939813031956',
	'714540769981104151',
	'698972362347118662',
	'857323639854465046',
	'672463893691629570',
	'759953897699278859',
	'429400991683575809',
	'569580494283603980',
	'902609541798170705',
	'956952697964208209',
	'295864073487384576',
	'516697403391213588',
	'401546261079130112',
	'752674902863118378',
	'887695020839276577',
	'573240480599375884',
	'132483735399563265',
	'684398215168000000',
	'558133405494280192',
	'901905649980559480',
	'356096935062405120',
	'703847498912890900',
	'592730946164359180',
	'634026849093287946',
	'142538186109747200',
	'694716486622773359',
	'811666658779070495',
	'369700858742571008',
	'390646851256188930',
	'1009066553280573440',
	'891905780008239114',
	'1315678595594584216',
	'886422555794227200',
	'892743454428373032',
	'703783490352840767'
];
