import {z} from 'zod';

export const registeruser = z.object({
    username: z.string().nonempty('Username is empty'),
    phonenumber: z.string().max(11).nonempty('Phone is empty'),
    password: z.string().max(20).nonempty('Password is empty'),
    confirm: z.string().max(20).nonempty('Confirm your password').optional(),
    // referral: z.string()
})
 .refine((data) => data.password === data.confirm , {
      message:"Passwords don't match",
      path: ['confirm'],
    })

export const paymentFormSchema = z.object({
    paymentMethod: z.string().nonempty('Please select a payment method'),
    accountName: z.string().nonempty('Account name is required'),
    accountNumber: z.string().nonempty('Account number is required'),

    //.min(10, 'Account number must be at least 10 digits')
    amount: z.number().min(500, 'Minimum withdraw is 500 php'),
 });


export const accountSchema = z.object({
    username: z.string(),
    phonenumber: z.string(),
    lastname: z.string(),
    fistname: z.string(),
    address: z.string(),
    city: z.string(),
    country:z.string(),
    postalcode: z.string(),
    paymentmethod: z.string(),
    accountnumber: z.string(),
})


export const userchangepassword = z.object({
    password: z.string().max(20).nonempty('New Password is empty'),
    confirm: z.string().max(20).nonempty('Confirm your new password').optional(),
    // referral: z.string()
})
 .refine((data) => data.password === data.confirm , {
      message:"Passwords don't match",
      path: ['confirm'],
    })

export const sendFiat = z.object({
    username: z.string().max(20).nonempty('Username is required'), 
    amount: z.number().min(500, 'Amount must be at least 500').max(999_000_000),
})

      
export type PaymentForm = z.infer<typeof paymentFormSchema>;
export type Register = z.infer<typeof registeruser>;
export type UserAccount = z.infer<typeof accountSchema>;
export type UserChangePassword = z.infer<typeof userchangepassword>;
export type SendFiat = z.infer<typeof sendFiat>;
