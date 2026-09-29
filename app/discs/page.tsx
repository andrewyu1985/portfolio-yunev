import DiscsApp from '@/components/discs/DiscsApp'
import DesignBar from '@/components/cinema/DesignBar'

export default function DiscsPage() {
  return (
    <>
      <DesignBar active="discs" />
      <DiscsApp />
    </>
  )
}
