import * as net from 'node:net';

const isUUID = any => {};
const isPem = any => {};
const isIPv4 = net.isIPv4;
const isIPv6 = net.isIPv6;
const isIP = any => net.isIP;

export {
	isIPv4 as IPv4,
	isIPv6 as IPv6,
	isIP as IP
};