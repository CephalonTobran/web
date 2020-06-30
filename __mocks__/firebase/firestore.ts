const firestore = jest.fn(() => {
  return {
    enablePersistence: jest.fn().mockImplementation(() => Promise.resolve()),
  }
})

export default firestore
