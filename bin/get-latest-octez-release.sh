#!/usr/bin/env python
import requests

def list_docker_tags(repository):
    """
    Lists the latest 10 tags that start with 'octez' for a given Docker image repository.

    :param repository: The name of the Docker image repository
    :return: A list of the latest 10 'octez' tags
    """
    octez_tags = []
    url = f"https://hub.docker.com/v2/repositories/{repository}/tags/"
    
    while url:
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch tags: {response.status_code}")
            print(response.json())
            break
        
        data = response.json()
        # Filter for tags starting with 'octez'
        octez_tags.extend([result['name'] for result in data['results'] if result['name'].startswith('octez')])
        
        # If we have 10 or more tags, we can stop paginating
        if len(octez_tags) >= 10:
            break
            
        url = data['next']  # Pagination: Get the next page URL

    # Return only the latest 10 tags
    return octez_tags[:10]

if __name__ == "__main__":
    repository = input("Enter the Docker Hub repository (e.g., 'library/nginx'): ")
    tags = list_docker_tags(repository)
    
    if tags:
        print(f"Latest 10 'octez' tags for '{repository}':")
        for tag in tags:
            print(tag)
    else:
        print(f"No 'octez' tags found for '{repository}'.")
