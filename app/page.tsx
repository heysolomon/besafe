"use client"

import { z } from "zod"
import axios from "axios";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import CheckerInput from '@/components/checkinput'
import Link from "next/link";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";


export default function Home() {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const checkStart = () => {
    setError(false);
    setSuccess(false);
    setLoading(true);
  };

  const checkSuccess = (msg: string) => {
    setSuccess(true);
    setLoading(false);
    setMessage(msg);
  };

  const checkFailed = (msg: string) => {
    setLoading(false);
    setError(true);
    setMessage(msg);
  };

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
    checkStart()
    try {
      const res = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
        "client": {
          "clientId": "besafe",
          "clientVersion": "1.0"
        },
        "threatInfo": {
          "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION"],
          "platformTypes": ["ALL_PLATFORMS"],
          "threatEntryTypes": ["URL", "THREAT_ENTRY_TYPE_UNSPECIFIED"],
          "threatEntries": [
            { ...values }
          ]
        }
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      checkSuccess("")
      console.log(res.data)
      if (Object.keys(res.data).length === 0) {
        toast({
          variant: "success",
          title: "You can proceed :)",
          description: <p>This website <span className="underline">{values.url}</span> is safe to visit. Enjoy your online experience!</p>,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Warning!!!",
          description: <p>This website <span className="underline">{values.url}</span> is flagged as malicious. Do not visit for your safety</p>,
        })
      }
    } catch (err: any) {
      if (err.message === 'Network Error') {
        checkFailed('');
        toast({
          variant: "destructive",
          description: `${err.message}`,
        })
      } else {
        checkFailed('');
        toast({
          variant: "destructive",
          description: `${err.message}`,
        })
      }
      console.log(err)
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(values)
  }
  return (
    <div className='fixed h-screen w-screen bg-bg bg-black bg-cover bg-center bg-repeat-y'>
      <nav className='flex items-center justify-between px-7 py-5 max-w-[1200px] mx-auto'>
        <Link href={`/`}>
          <p className='bg-gradient-to-r from-[#EB568E] to-[#144EE3] inline-block text-transparent bg-clip-text text-lite text-xl md:text-[30px] font-[800]'>beSAFE</p>
        </Link>

        <Link href={`https://github.com/heysolomon/besafe`}>
          <Button>
            View on Github
          </Button>
        </Link>
      </nav>

      <div className='flex flex-col items-center justify-center pt-24 px-7 md:p-0 lg:w-[1000px] mx-auto mt-10'>
        <h1 className='text-3xl md:text-6xl font-[800] text-center bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3] text-transparent bg-clip-text'>Navigate the Web with Confidence :)</h1>
        <p className='text-lite text-sm md:text-xl mt-3 font-[300] text-center'>With beSAFE, ensure your online safety effortlessly. <br className="hidden md:block" /> Just enter a URL, and we&apos;ll let you know if it&apos;s safe or not.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 w-full">
            <FormField control={form.control} name="url" render={({ field }) => (
              <FormItem className="mt-3">
                <FormControl>
                  <CheckerInput
                    field={field}
                    id="url"
                    loading={loading}
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
