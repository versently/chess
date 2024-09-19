import { send } from "./contact";

export const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name-order");
    const email = data.get("email-order");
    const phone = data.get("phone-order");
    const message = data.get("message-order");

    await send({ name, email, phone, message });

    return new Response(
      JSON.stringify({
        message: "Письмо отправлено!",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      console.error("Ошибка при отправке письма:", error.message);
      return new Response(
        JSON.stringify({
          message: error.message,
        }),
        { status: 500 }
      );
    }
  }
};
