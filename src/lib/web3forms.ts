const ACCESS_KEY = "258e0daf-f76c-4e52-998a-d690bf2307d6"

export async function submitAwningEnquiry(
  form: HTMLFormElement,
  source: string
) {
  const formData = new FormData(form)
  formData.append("access_key", ACCESS_KEY)
  formData.append("subject", `New awning quote request — ${source}`)
  formData.append("from_name", "Chhaya Awning website")
  formData.append("form_source", source)
  formData.append("page_url", window.location.href)

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })

  const data = (await response.json()) as { success?: boolean; message?: string }
  if (!response.ok || !data.success) {
    throw new Error(data.message || "We couldn't send your enquiry. Please try again.")
  }
}
