"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CheckerInput from '@/components/checkinput'
import { Button } from '@/components/ui/button'
import axios from "axios";


export default function Home() {
  const formSchema = z.object({
    url: z.string().url("input must be a url"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  const submit = async (values: z.infer<typeof formSchema>) => {

    try {
      const res = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
        "client": {
          "clientId": "besafe",
          "clientVersion": "1.5.2"
        },
        "threatInfo": {
          "threatTypes": ["SOCIAL_ENGINEERING"],
          "platformTypes": ["ALL_PLATFORMS"],
          "threatEntryTypes": ["URL"],
          "threatEntries": [
            { ...values }
          ]
        }
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(res)
    } catch (err) {
      // if (err.message === 'Network Error') {
      //   dispatch(loginFailure('Network Error'));
      // } else {
      //   dispatch(loginFailure(err.response.data?.non_field_errors[0]));
      // }
      console.log(err)
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(values)
  }
  return (
    <div className='h-screen w-screen bg-bg bg-black bg-cover bg-center bg-repeat-y'>
      <nav className='flex items-center justify-between px-10 py-5'>
        <p className='bg-gradient-to-r from-[#EB568E] to-[#144EE3] inline-block text-transparent bg-clip-text text-lite text-xl md:text-[30px] font-[800]'>beSAFE</p>

        <Button className='' onClick={() => console.log(process.env.NEXT_PUBLIC_API_KEY)}>
          View on Github
        </Button>
      </nav>

      <div className='flex flex-col items-center pt-24 px-7 md:p-0 md:w-[1000px] mx-auto mt-10'>
        <h1 className='text-2xl md:text-[50px] font-[800] text-center bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3] inline-block text-transparent bg-clip-text'>Navigate the Web with Confidence :)</h1>
        <p className='text-lite text-[10px] md:text-md mt-3 font-[300] text-center'>With beSAFE, ensure your online safety effortlessly. <br /> Just enter a URL, and we&apos;ll let you know if it&apos;s safe or not.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 w-full">

            <FormField control={form.control} name="url" render={({ field }) => (
              <FormItem className="mt-3">
                <FormControl>
                  <CheckerInput
                    field={field}
                    id="url"
                    error={form.formState.errors.url}
                    {...field} />
                </FormControl>
                <FormMessage className="text-white text-center text-xs" />
              </FormItem>
            )} />



          </form>
        </Form>
      </div>

    </div>
  )
}
