import { useEffect, useState } from "react";


const MountHook = () => {

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true); // Ensure the component is mounted before accessing params
    }, []);

    if (!mounted) return null; // Avoid rendering before the component is mounted

  return (MountHook)
}

export default MountHook