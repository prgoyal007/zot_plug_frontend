import React from "react";
import { Leaf, Camera, Check, User, type LucideProps } from "lucide-react";

const map = {
	leaf: Leaf,
	camera: Camera,
	check: Check,
	user: User,
} as const;

export type IconName = keyof typeof map;

type Props = {
	name: IconName;
	size?: number;
	color?: string;
	strokeWidth?: number;
	style?: React.CSSProperties;
};

export default function Icon({ name, size = 24, color = "currentColor", strokeWidth = 2, style }: Props) {
	const Cmp = map[name];
	return <Cmp size={size} color={color} strokeWidth={strokeWidth} style={style as LucideProps["style"]} />;
}

