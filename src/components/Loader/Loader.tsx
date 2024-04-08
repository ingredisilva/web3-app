import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="Loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        colors={['#00204a', '#13437a', '#2656aa', '#3979da', '#4daafd']}
      />
    </div>
  )
}

export default Loader
