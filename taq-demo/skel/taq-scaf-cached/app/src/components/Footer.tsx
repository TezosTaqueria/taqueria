const Footer = ({ contractAddress }: { contractAddress: string }) => (
	<footer>
		<div>
			<a
				href='https://github.com/ecadlabs/taqueria'
				target='_blank'
				rel='noopener noreferrer nofollow'
			>
				<img src='images/github.svg' alt='github-link' />
			</a>
		</div>
		<div>
			<a
				href={`https://better-call.dev/ghostnet/${contractAddress}/operations`}
				target='_blank'
				rel='noopener noreferrer nofollow'
				title={contractAddress}
			>
				<img src='images/file-text.svg' title={contractAddress} alt={contractAddress} />
			</a>
		</div>
		<div>
			<a
				href='https://twitter.com/ecadlabs'
				target='_blank'
				rel='noopener noreferrer nofollow'
			>
				<img src='images/twitter.svg' alt='twitter-link' />
			</a>
		</div>
	</footer>
);

export default Footer;
