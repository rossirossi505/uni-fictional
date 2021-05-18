<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */


if (strstr($_SERVER['SERVER_NAME'], 'justdisgusting.local')){


	// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );


}else{

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db9uiejabrkehc' );

/** MySQL database username */
define( 'DB_USER', 'uletvgmfgtfxo' );

/** MySQL database password */
define( 'DB_PASSWORD', 'rosROS@@@' );

/** MySQL hostname */
define( 'DB_HOST', '127.0.0.1' );
}



/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'O/VSkwN1DFS38tNTMjWCuMapG8tOD3JBPCWl41q/HmOGRTV0C4nsdhcOJGjLcGqXItpOu7yDG7J4HxBT1TmBTQ==');
define('SECURE_AUTH_KEY',  '6Ckq5VAVU5O2aFPzTSna5Xz83ezH7PhbtRT+y1aA5WLNTCY1FccN1CZ24iyRa/W/PIfUKtCpmqjyv/B8Q1D0aw==');
define('LOGGED_IN_KEY',    '8eJy+R5sbr0+jNeLSB+nIqFyYeyW3sOC32yVXHu5bPzpgJkjVhVKSc9QVYrBGdE/42alqghhyI5r+lcttM/Mdw==');
define('NONCE_KEY',        '2QT4u69sL5bHbtEghSbiB2wIyXBL4tmgfC9nXaVMpqsrsSbA0YuZ8/Je3s4M2MwzP5dI+OIbBwtoAJUrY6TtjQ==');
define('AUTH_SALT',        'N+sy2vJ3B3m4gCy2rpOHBnx39SeRJsGCk8uFlqj3yrHV365jbZLWX5dHwKOhQ7UxPqZFLn+zuYEkNaOiQ0GA1Q==');
define('SECURE_AUTH_SALT', '03G/3/yICWVv341m/V0pLjgF2XxvVI0hHyhXa+68uVjv2AAC+pXoEzMS9Bi833EjC5S8B3cmlI79rnOD8bPj7w==');
define('LOGGED_IN_SALT',   'Y63HmMV93+fy9QwqSjCBCPxy+EOC0w2uJ0tfVBtleim37iVLCYZG/krTd+KpD47MqP3glP9UMjBOIINfi+ujGw==');
define('NONCE_SALT',       'Dft8CrlTTP7PI8slL1n5cavDQxel8NFKkpBu7CGqjWVrxuErJ7O+uEpnZ6dVMC+SpIWDIoSCyHQKX39tmPBl4Q==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
