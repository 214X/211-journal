import Switch from "../Switch/Switch";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";

type ThemeSwitchProps = {
    lightLabel: string;
    darkLabel: string;
}

export default function ThemeSwitch({lightLabel, darkLabel} : ThemeSwitchProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <Switch
            leftLabel={lightLabel}
            rightLabel={darkLabel}
            checked={isDark}
            onChange={(dark) => setTheme(dark ? 'dark' : 'light')}
            thumbContent={isDark ? <MoonIcon /> : <SunIcon />}
        />
    );
}
