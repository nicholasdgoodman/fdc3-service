/**
 * @module ContextChannels
 */

import {Identity} from 'openfin/_v2/main';

import {tryServiceDispatch, channelPromise} from './connection';
import {APITopic} from './internal';

export type ChannelId = string;

export const GLOBAL_CHANNEL_ID: ChannelId = 'global';

/**
 * Object representing a fully-initialised channel.
 *
 * Whenever the service returns any kind of channel info, it'll always be with this type.
 */
export interface Channel {
    /**
     * Would be generated by the service - what you pass to the API calls below
     */
    id: ChannelId;

    /**
     * Uniquely defines each channel type
     *
     * Currently two channel types. More may be added in the future.
     */
    type: 'global'|'user';

    /**
     * A user-readable name for this channel, e.g: "Red"
     */
    name: string;

    /**
     * The colour that should be associated within this channel when displaying this channel in a UI
     */
    color: number
}

export interface ChannelChangedEvent {
    type: 'channel-changed'

    identity: Identity,
    channel: Channel,
    previousChannel?: Channel
}

/**
 * Get all created channels
 */
export async function getAllChannels(): Promise<Channel[]> {
    return tryServiceDispatch(APITopic.GET_ALL_CHANNELS, {});
}

/**
 * Sets the window to the channel with the given identifier
 *
 * Use the special constant 'global' to revert to the global channel.
 */
export async function joinChannel(id: ChannelId, identity?: Identity): Promise<void> {
    return tryServiceDispatch(APITopic.JOIN_CHANNEL, {id, identity});
}

/**
 * Returns the channel that the current window is assigned to
 */
export async function getChannel(identity?: Identity): Promise<Channel> {
    return tryServiceDispatch(APITopic.GET_CHANNEL, {identity});
}

/**
 * Returns a list of all windows belonging to the specified channel.
 *
 */
export async function getChannelMembers(id: ChannelId): Promise<Identity[]> {
    return tryServiceDispatch(APITopic.GET_CHANNEL_MEMBERS, {id});
}
