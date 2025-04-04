const projectName = 'mentorship-tool';

module.exports = {
	apps: [
		{
			name: projectName,
			autorestart: true,
			exec_mode: 'fork',
			watch: true,
			script: 'pnpm start',
			error_file: `~/.pm2/logs/${projectName}-error.log`,
			out_file: `~/.pm2/logs/${projectName}-out.log`,
			ignore_watch: ['node_modules', 'src'],
		}
	]
};
