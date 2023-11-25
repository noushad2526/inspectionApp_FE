// menu props
const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// resitration countriess
export const registrationCountry = [
    { value: 'Saudi Arabia' },
    { value: 'Syria' },
    { value: 'Oman' },
    { value: 'Jordan' },
    { value: 'Egypt' },
    { value: 'Kuwait' },
    { value: 'Iraq' },
    { value: 'Bahrain' },
    { value: 'Qatar' },
]

// registration type
export const registrationType = [
    { value: 'Private Vehicle' },
    { value: 'Public Transportation' },
    { value: 'Private Transportation' },
    { value: 'Trailer' },
    { value: 'Motorcycle' },
    { value: 'Taxi' },
    { value: 'Export' },
    { value: 'Entertainment Motorcycle' },
    { value: 'Diplomatic Association' },
    { value: 'Public Bus' },
    { value: 'Diplomatic Bus' },
    { value: 'Temporary' },
    { value: 'Public Works' },
]

// inspection service type
export const inspectionServiceType = [
    { value: 'Periodic Inspection Service' },
    { value: 'Re Inspection Service' },
]