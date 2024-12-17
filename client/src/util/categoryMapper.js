const categoryMapper = (category) => {
    switch (category) {
        case 'webdev':
            return 'Web Development';
        case 'ai':
            return 'Artificial Intelligence';
        case 'cyber':
            return 'Cyber Security';
        case 'tech':
            return 'Technology';
        case 'others':
            return 'Others';
        default:
            return category;
    }
};

export default categoryMapper;