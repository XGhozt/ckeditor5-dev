/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const tasks = {
	releaseSubRepositories( ...args ) {
		return require( './release-tools/tasks/releasesubrepositories' )( ...args );
	},

	bumpVersions( ...args ) {
		return require( './release-tools/tasks/bumpversions' )( ...args );
	},

	generateChangelogForSinglePackage( ...args ) {
		return require( './release-tools/tasks/generatechangelogforsinglepackage' )( ...args );
	},

	generateChangelogForMonoRepository( ...args ) {
		return require( './release-tools/tasks/generatechangelogformonorepository' )( ...args );
	},

	/**
	 * Collects messages to translate (from `t()` calls) and stores them in the `ckeditor5/build/.transifex` directory.
	 */
	createPotFiles( ...args ) {
		const createPotFiles = require( './translations/createpotfiles' );

		createPotFiles( ...args );
	},

	/**
	 * Uploads messages to translate on the Transifex server.
	 *
	 * @returns {Promise}
	 */
	async uploadPotFiles() {
		const uploadPotFiles = require( './translations/upload' );
		const getToken = require( './translations/gettoken' );

		const token = await getToken();

		await uploadPotFiles( { token } );
	},

	/**
	 * Download translations from the Transifex server.
	 *
	 * @returns {Promise}
	 */
	async downloadTranslations( { packages } ) {
		const downloadTranslations = require( './translations/download' );
		const getToken = require( './translations/gettoken' );

		const token = await getToken();

		await downloadTranslations( { token, packages } );
	}
};

module.exports = tasks;
