// src/components/memory/MemoryLogger.tsx (continuation)
className="p-4 bg-white rounded-lg shadow-lg">
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Memory Content
    </label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      rows={4}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Category
    </label>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value as MemoryLog['category'])}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="observation">Observation</option>
      <option value="decision">Decision</option>
      <option value="interaction">Interaction</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Tags (comma-separated)
    </label>
    <input
      type="text"
      value={tags.join(', ')}
      onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>

  <button
    type="submit"
    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Log Memory
  </button>
</form>
</motion.div>
);
}