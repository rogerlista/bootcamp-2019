import Mail from '../../lib/Mail'

class DeliveryMail {
  get key() {
    return 'DeliveryMail'
  }

  async handle({ data }) {
    const { deliveryman, recipient, order } = data

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        city: recipient.city,
        state: recipient.state,
        product: order.product,
      },
    })
  }
}

export default new DeliveryMail()
