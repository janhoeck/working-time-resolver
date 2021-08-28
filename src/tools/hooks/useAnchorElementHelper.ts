import React, { useState } from 'react';

export const useAnchorElementHelper = () => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement>();

    const open = (event: React.MouseEvent) => {
        setAnchorElement(event.currentTarget as HTMLElement);
    };

    const close = () => {
        setAnchorElement(undefined);
    };

    return {
        anchorElement: anchorElement,
        isOpen: Boolean(anchorElement),
        open: open,
        close: close,
    };
};
