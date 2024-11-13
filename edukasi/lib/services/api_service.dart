import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/item_model.dart';
import '../models/user_model.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.40.151:5000/api';

  // Fetch items
  Future<List<Item>> fetchItems() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/items'));
      if (response.statusCode == 200) {
        List jsonResponse = json.decode(response.body);
        return jsonResponse.map((data) => Item.fromJson(data)).toList();
      } else {
        print("Failed to load items: ${response.statusCode}");
        return [];
      }
    } catch (e) {
      print("Error fetching items: $e");
      return [];
    }
  }

  // Create item
  Future<bool> createItem(Item item) async {
    try {
      print("Creating item: ${item.toJson()}");
      final response = await http.post(
        Uri.parse('$baseUrl/items'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(item.toJson()),
      );

      if (response.statusCode == 201) {
        print("Item created successfully");
        return true;
      } else {
        print("Failed to create item: ${response.statusCode}");
        print("Response body: ${response.body}");
        return false;
      }
    } catch (e) {
      print("Error creating item: $e");
      return false;
    }
  }

  // Update item
  Future<bool> updateItem(Item item) async {
    try {
      print("Updating item with ID: ${item.id}");
      final response = await http.put(
        Uri.parse('$baseUrl/items/${item.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(item.toJson()),
      );

      if (response.statusCode == 200) {
        print("Item updated successfully");
        return true;
      } else {
        print("Failed to update item: ${response.statusCode}");
        print("Response body: ${response.body}");
        return false;
      }
    } catch (e) {
      print("Error updating item: $e");
      return false;
    }
  }

  // Delete item
  Future<bool> deleteItem(int id) async {
    try {
      print("Deleting item with ID: $id");
      final response = await http.delete(Uri.parse('$baseUrl/items/$id'));

      if (response.statusCode == 200) {
        print("Item deleted successfully");
        return true;
      } else {
        print("Failed to delete item: ${response.statusCode}");
        return false;
      }
    } catch (e) {
      print("Error deleting item: $e");
      return false;
    }
  }

  // Login user
  Future<User?> loginUser(String username, String password) async {
    try {
      print("Attempting login with username: $username and password: $password");

      final response = await http.post(
        Uri.parse('$baseUrl/users/login'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'username': username,
          'password': password,
        }),
      );

      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");

      if (response.statusCode == 200) {
        print("Login successful");
        return User.fromJson(json.decode(response.body));
      } else {
        print("Login failed: ${response.statusCode}, ${response.body}");
        return null;
      }
    } catch (e) {
      print("Error during login: $e");
      return null;
    }
  }
}
