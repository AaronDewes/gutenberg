/**
 * Internal dependencies
 */
const debug = require( '../../debug' );

/** @typedef {import('@actions/github/lib/utils').GitHub} GitHub */
/** @typedef {import('@octokit/webhooks-types').PullRequestEvent} WebhookPayloadPullRequest */

/**
 * Assigns any issues 'fixed' by a newly opened PR to the author of that PR.
 *
 * @param {WebhookPayloadPullRequest} payload Pull request event payload.
 * @param {InstanceType<GitHub>}                    octokit Initialized Octokit REST client.
 */
async function assignFixedIssues( payload, octokit ) {
	const regex = /(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved):? +(?:\#?|https?:\/\/github\.com\/WordPress\/gutenberg\/issues\/)(\d+)/gi;

	let match;
	// @ts-ignore
	while ( ( match = regex.exec( payload.pull_request.body ) ) ) {
		const [ , issue ] = match;

		debug(
			`assign-fixed-issues: Assigning issue #${ issue } to @${ payload.pull_request.user.login }`
		);

		await octokit.rest.issues.addAssignees( {
			owner: payload.repository.owner.login,
			repo: payload.repository.name,
			issue_number: +issue,
			assignees: [ payload.pull_request.user.login ],
		} );

		debug(
			`assign-fixed-issues: Applying '[Status] In Progress' label to issue #${ issue }`
		);

		await octokit.rest.issues.addLabels( {
			owner: payload.repository.owner.login,
			repo: payload.repository.name,
			issue_number: +issue,
			labels: [ '[Status] In Progress' ],
		} );
	}
}

module.exports = assignFixedIssues;
